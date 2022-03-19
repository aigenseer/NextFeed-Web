import {Component, OnInit} from '@angular/core';
import {Participant} from "../../../../model/participant/participant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";
import {SessionService} from "../../../../service/sessionService/session.service";
import {
  IAbstractSessionManagementComponent
} from "../../../organisms/abstract-session-management/abstract-session-management.component";
import {select, Store} from "@ngrx/store";
import {IAppAdminState} from "../../../../state/admin/app.admin.state";
import {selectCurrentSessionData, selectTokenCode} from "../../../../state/admin/admin.selector";
import {take} from "rxjs/operators";
import {removeCurrentDataSession} from "../../../../state/admin/admin.actions";
import {firstValueFrom} from "rxjs";
import {Question} from "../../../../model/question/question.model";
import {
  AbstractActiveSessionManagementComponent
} from "../../../organisms/abstract-active-session-management/abstract-active-session-management.component";
import {WaitDialogService} from "../../../../service/waitDialogService/wait-dialog.service";

@Component({
  selector: 'app-presenter-session',
  templateUrl: './presenter-session.component.html',
  styleUrls: ['./presenter-session.component.scss']
})
export class PresenterSessionComponent extends AbstractActiveSessionManagementComponent implements IAbstractSessionManagementComponent, OnInit  {

  sessionCode: string = ""
  displayShareCodeDialog: boolean = true

  constructor(
    protected readonly router: Router,
    protected readonly route: ActivatedRoute,
    protected readonly messageService: MessageService,
    protected readonly sessionService: SessionService,
    protected readonly adminSocket: AdminSocket,
    private readonly store: Store<IAppAdminState>,
    private readonly waitDialogService: WaitDialogService
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

  protected getToken()
  {
    return firstValueFrom(this.store.pipe(select(selectTokenCode), take(1)))
  }

  public startConnection(token: string){
    this.connectToSocket(token);
  }

  private connectToSocket(token: string){
    this.waitDialogService.open("Wait for connection");
    this.adminSocket.connect(token).subscribe((next) => {
      if(next instanceof Error){
        this.waitDialogService.open("Connection lost");
      }else {
        this.waitDialogService.close();
        this.adminSocket.onJoinParticipant(this.sessionId as number).subscribe(p => this.onJoinParticipant(p));
        this.adminSocket.onUpdateQuestion(this.sessionId as number).subscribe(q => this.addQuestion(q))
      }
    });
  }

  private onJoinParticipant(participant: Participant){
    this.participants.push(participant);
    this.displayNotify({ severity: 'info', summary: 'User joined', detail: participant.nickname, life: 2000 });
  }

  public navigateToLogin(){
    this.router.navigate(['/presenter']);
  }

  onClickCloseSession(){
    this.store.dispatch(removeCurrentDataSession());
    this.logOutSession();
  }

  onHideShareCodeDialog(){
    this.displayShareCodeDialog = false;
  }

  onClosedQuestion(question: Question) {
    this.adminSocket.closeQuestion(this.sessionId as number, question);
  }
}
