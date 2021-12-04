import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Participant} from "../../../../model/participant/participant.model";
import {ParticipantSocket} from "../../../../socket/participantSocket/participant.socket";
import {MessageService} from "primeng/api";
import {SessionService} from "../../../../service/sessionService/session.service";
import {
  AbstractSessionManagementComponent,
  IAbstractSessionManagementComponent
} from "../../../organisms/abstract-session-management/abstract-session-management.component";
import {firstValueFrom} from "rxjs";
import {select, Store} from "@ngrx/store";
import {take} from "rxjs/operators";
import {IAppParticipantState} from "../../../../state/participant/app.participant.state";
import {
  selectParticipantData,
  selectQuestionIds,
  selectTokenCode
} from "../../../../state/participant/participant.selector";
import {pushQuestionId, removeToken, setQuestionIds} from "../../../../state/participant/participant.actions";
import {Question} from "../../../../model/question/question.model";
import {IQuestionTemplate} from "../../../molecules/create-question/create-question.component";


@Component({
  selector: 'app-paricipant-session',
  templateUrl: './paricipant-session.component.html',
  styleUrls: ['./paricipant-session.component.scss']
})
export class ParticipantSessionComponent extends AbstractSessionManagementComponent implements IAbstractSessionManagementComponent, OnInit  {

  nickname: string = "";
  participantId: number = 0;
  questionIds: number[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected messageService: MessageService,
    protected sessionService: SessionService,
    protected participantSocket: ParticipantSocket,
    private readonly store: Store<IAppParticipantState>
  ){
    super(router, route, messageService, sessionService);
  }

  ngOnInit() {
    this.validateSession();
  }

  protected getToken()
  {
    return firstValueFrom(this.store.pipe(select(selectTokenCode), take(1)));
  }

  private loadData(){
    firstValueFrom(this.store.pipe(select(selectParticipantData), take(1))).then(participantData => {
      this.nickname = participantData?.nickname
      this.participantId = participantData?.id;
    });
    firstValueFrom(this.store.pipe(select(selectQuestionIds), take(1))).then(questionIds => {
      this.questionIds = Array.from(questionIds);
    });
  }

  public startConnection(token: string){
    this.loadData();
    this.store.select(selectQuestionIds).subscribe(questionIds => {
      if(questionIds !== undefined) questionIds.map(id => this.questionIds.push(id));
    });
    this.connectToSocket(token);
  }

  public navigateToLogin(){
    let path = 'participant/join/';
    if(this.sessionId !== null) path += this.sessionId;
    this.router.navigate([path]);
  }

  private connectToSocket(token: string){
    this.participantSocket.connect(token).then(() => {
      this.participantSocket.onJoinParticipant(this.sessionId as number).subscribe(p => this.onJoinParticipant(p));
      this.participantSocket.onCreateQuestion(this.sessionId as number).subscribe(q => this.onCreateQuestion(q));
      this.participantSocket.onUpdateQuestion(this.sessionId as number).subscribe(q => this.addQuestion(q))
    });
  }

  private onJoinParticipant(participant: Participant){
    this.participants.push(participant);
    this.displayNotify({ severity: 'info', summary: 'User joined', detail: participant.nickname, life: 2000 });
  }

  private onCreateQuestion(question: Question){
    this.store.dispatch(pushQuestionId({questionId: question.id as number}));
  }

  onClickLogout(){
    this.store.dispatch(removeToken());
    this.logOutSession();
  }

  onCreatedQuestionTemplate(createdQuestion: IQuestionTemplate) {
    let question = new Question(1, this.participantId, "message", 0, new Date().getTime(), null);
    this.onCreateQuestion(question);
    this.addQuestion(question);

    this.participantSocket.createQuestion(this.sessionId as number, new Question(null, createdQuestion.anonymous? null: this.participantId, createdQuestion.message, 0, new Date().getTime(), null));
  }


}


