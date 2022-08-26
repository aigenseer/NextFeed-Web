import {Component, OnDestroy, OnInit} from '@angular/core';
import {Participant} from "../../../../model/participant/participant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {ConfirmationService, MessageService} from "primeng/api";
import {SessionService} from "../../../../service/sessionService/session.service";
import {
  IAbstractSessionManagementComponent
} from "../../../organisms/abstract-session-management/abstract-session-management.component";
import {select, Store} from "@ngrx/store";
import {IAppAdminState} from "../../../../state/admin/app.admin.state";
import {selectCurrentSessionData} from "../../../../state/admin/admin.selector";
import {take} from "rxjs/operators";
import {removeCurrentDataSession} from "../../../../state/admin/admin.actions";
import {firstValueFrom} from "rxjs";
import {Question} from "../../../../model/question/question.model";
import {
  AbstractActiveSessionManagementComponent
} from "../../../organisms/abstract-active-session-management/abstract-active-session-management.component";
import {WaitDialogService} from "../../../../service/waitDialogService/wait-dialog.service";
import {environment} from "../../../../../environments/environment";
import {AcceptDialogService} from "../../../../service/acceptDialogService/accept-dialog.service";
import {selectToken} from "../../../../state/token/token.selector";
import {CustomRouterService} from "../../../../service/customRouter/custom-router.service";
import {SurveyListenerService} from "../../../../service/surveyListenerService/survey-listener.service";
import {PresenterSessionSocket} from "../../../../socket/presenter/sessionSocket/presenter.session.socket";
import {PresenterQuestionSocket} from "../../../../socket/presenter/questionSocket/presenter.question.socket";
import {PresenterSurveySocket} from "../../../../socket/presenter/surveySocket/presenter.survey.socket";

const AVERAGE_LABEL = "Average";

@Component({
  selector: 'app-presenter-session',
  templateUrl: './presenter-session.component.html',
  styleUrls: ['./presenter-session.component.scss']
})
export class PresenterSessionComponent extends AbstractActiveSessionManagementComponent implements IAbstractSessionManagementComponent, OnInit, OnDestroy  {

  moodLineValues: {[key: string]: number} = {
    [AVERAGE_LABEL]: 0
  };

  sessionCode: string = ""
  displayShareCodeDialog: boolean = environment.displayShareSessionDialog
  visibleSidebar: boolean = false;

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    protected readonly messageService: MessageService,
    protected readonly sessionService: SessionService,
    private readonly sessionSocket: PresenterSessionSocket,
    private readonly questionSocket: PresenterQuestionSocket,
    private readonly surveySocket: PresenterSurveySocket,
    private readonly store: Store<IAppAdminState>,
    private readonly waitDialogService: WaitDialogService,
    private readonly confirmationService: ConfirmationService,
    private readonly acceptDialogService: AcceptDialogService,
    private readonly customRouterService: CustomRouterService,
    private readonly surveyListenerService: SurveyListenerService
  ) {
    super(router, route, messageService, sessionService);
  }

  ngOnInit(){
    this.validateSession().then(_ => {
      firstValueFrom(this.store.pipe(select(selectCurrentSessionData), take(1))).then(sessionData => {
        this.sessionCode = sessionData.sessionCode;
      });
    });
  }

  ngOnDestroy() {
    this.sessionSocket.disconnect();
    this.questionSocket.disconnect();
    this.surveySocket.disconnect();
    this.displayShareCodeDialog = false;
    this.visibleSidebar = false;
    this.sessionCode = "";
  }

  protected getToken()
  {
    return firstValueFrom(this.store.pipe(select(selectToken), take(1)))
  }

  public startConnection(token: string){
    this.connectToSocket(token);
  }

  private connectToSocket(token: string){
    this.waitDialogService.open("Wait for connection");
    this.surveySocket.connect(token).subscribe((next) => {
      if(next instanceof Error){
        this.acceptDialogService.open("Connection lost", "Session are closed.").then(() => {
          this.logOutSession();
        });
      }else {
        this.surveySocket?.onCreateSurvey(this.getSessionId()).subscribe(survey =>{
          this.surveyListenerService.onNewSurvey(survey);
          this.surveySocket?.onUpdateSurvey(this.getSessionId(), survey.id).subscribe(survey =>{
            this.surveyListenerService.onNewSurvey(survey);
          });
          this.surveySocket?.onSurveyResult(this.getSessionId(), survey.id).subscribe(survey =>{
            this.surveyListenerService.onNewSurvey(survey);
          });
        });
      }
    });
    this.questionSocket.connect(token).subscribe((next) => {
      if(next instanceof Error){
        this.acceptDialogService.open("Connection lost", "Session are closed.").then(() => {
          this.logOutSession();
        });
      }else {
        this.questionSocket.onUpdateQuestion(this.getSessionId()).subscribe(q => this.addQuestion(q))
      }
    });
    this.sessionSocket.connect(token).subscribe((next) => {
      if(next instanceof Error){
        this.acceptDialogService.open("Connection lost", "Session are closed.").then(() => {
          this.logOutSession();
        });
      }else {
        this.waitDialogService.close();
        this.sessionSocket.onJoinParticipant(this.getSessionId()).subscribe(p => this.onJoinParticipant(p));
        this.sessionSocket.onUpdateMood(this.getSessionId()).subscribe(value => this.updateMoodAverageLineChart(value));
        this.sessionSocket.onClose(this.getSessionId()).subscribe(value => this.onCloseSession());
        this.sessionSocket.onParticipantConnectionStatus(this.getSessionId()).subscribe(p => this.updateParticipants(p))
      }
    });
  }

  private onJoinParticipant(participant: Participant){
    this.participants.push(participant);
    this.displayNotify({ severity: 'info', summary: 'User joined', detail: participant.nickname, life: 2000 });
  }

  public navigateToLogin(){
    this.customRouterService.navigateWithObserverQueryParams(['/presenter']);
  }

  onClickCloseSession(){
    this.visibleSidebar = false;
    this.confirmationService.confirm({
      header: 'Close Session',
      message: 'Are you sure you want to finish the session?',
      accept: () => {
        this.sessionService.closeSession(this.getSessionId());
        this.logOutSession();
      }
    });
  }

  private onCloseSession() {
    this.logOutSession();
  }

  protected logOutSession(){
    this.ngOnDestroy();
    this.store.dispatch(removeCurrentDataSession());
    super.logOutSession();
  }

  onHideShareCodeDialog(){
    this.displayShareCodeDialog = false;
  }

  onClosedQuestion(question: Question) {
    this.questionSocket.closeQuestion(this.sessionId as number, question);
  }

  updateMoodAverageLineChart(value: number){
    this.moodLineValues[AVERAGE_LABEL] = value;
  }

  onClickOpenWelcomeDialog() {
    this.visibleSidebar = false;
    this.displayShareCodeDialog = true;
  }

  private updateParticipants(participants: Participant[]) {
    this.participants = participants
  }

  onKillParticipant(participant: Participant) {
    this.confirmationService.confirm({
      header: `Disconnect Participant (${participant.nickname})`,
      message: "Do you really want to deregister the participant?",
      accept: () => {
        setTimeout(() => {
          this.confirmationService.confirm({
            header: `Block Participant (${participant.nickname})`,
            message: "Should the participant be blocked?",
            accept: () => {
              this.sessionService.killParticipant(this.getSessionId(), participant.id, true);
            },
            reject: () =>{
              this.sessionService.killParticipant(this.getSessionId(), participant.id, false);
            }
          });
        }, 1000);
      }
    });
  }

}
