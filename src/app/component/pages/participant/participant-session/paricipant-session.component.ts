import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Participant} from "../../../../model/participant/participant.model";
import {ParticipantSocket} from "../../../../socket/participantSocket/participant.socket";
import {MessageService} from "primeng/api";
import {SessionService} from "../../../../service/sessionService/session.service";
import {
  IAbstractSessionManagementComponent
} from "../../../organisms/abstract-session-management/abstract-session-management.component";
import {firstValueFrom} from "rxjs";
import {select, Store} from "@ngrx/store";
import {take} from "rxjs/operators";
import {IAppParticipantState, IVotedQuestion} from "../../../../state/participant/app.participant.state";
import {
  selectParticipantData,
  selectQuestionIds,
  selectTokenCode, selectVotedQuestions
} from "../../../../state/participant/participant.selector";
import {
  deleteVotedQuestion,
  pushQuestionId,
  removeToken,
  votedQuestion
} from "../../../../state/participant/participant.actions";
import {Question} from "../../../../model/question/question.model";
import {IQuestionTemplate} from "../../../molecules/create-question/create-question.component";
import {
  AbstractActiveSessionManagementComponent
} from "../../../organisms/abstract-active-session-management/abstract-active-session-management.component";
import {WaitDialogService} from "../../../../service/waitDialogService/wait-dialog.service";

const AVERAGE_LABEL = "Average";


@Component({
  selector: 'app-paricipant-session',
  templateUrl: './paricipant-session.component.html',
  styleUrls: ['./paricipant-session.component.scss']
})
export class ParticipantSessionComponent extends AbstractActiveSessionManagementComponent implements IAbstractSessionManagementComponent, OnInit  {

  nickname: string = "";
  participantId: number = 0;
  questionIds: number[] = [];
  votedQuestions: IVotedQuestion[] = [];
  moodLineValues: {[key: string]: number} = {
    [AVERAGE_LABEL]: 0
  };

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected messageService: MessageService,
    protected sessionService: SessionService,
    protected participantSocket: ParticipantSocket,
    private readonly store: Store<IAppParticipantState>,
    private readonly waitDialogService: WaitDialogService
  ){
    super(router, route, messageService, sessionService);
  }

  ngOnInit() {
    this.testMoodChart();
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
    this.store.select(selectVotedQuestions).subscribe(votes => {
      this.votedQuestions = votes;
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
    this.waitDialogService.open("Wait for connection");
    this.participantSocket.connect(token).subscribe((next) => {
      if(next instanceof Error){
        this.waitDialogService.open("Connection lost");
      }else {
        this.waitDialogService.close();
        this.participantSocket.onJoinParticipant(this.sessionId as number).subscribe(p => this.onJoinParticipant(p));
        this.participantSocket.onUpdateQuestion(this.sessionId as number).subscribe(q => this.addQuestion(q));
      }
    });
  }

  private onJoinParticipant(participant: Participant){
    this.participants.push(participant);
    this.displayNotify({ severity: 'info', summary: 'User joined', detail: participant.nickname, life: 2000 });
  }

  private addOwnQuestion(question: Question){
    this.store.dispatch(pushQuestionId({questionId: question.id as number}));
  }

  onClickLogout(){
    this.store.dispatch(removeToken());
    this.store.dispatch(deleteVotedQuestion())
    this.logOutSession();
  }

  onCreatedQuestionTemplate(createdQuestion: IQuestionTemplate) {
    this.sessionService.createQuestion(this.sessionId as number, new Question(null, createdQuestion.anonymous? null: this.participantId, createdQuestion.message, 0, new Date().getTime(), null))
      .then(question => this.addOwnQuestion(question))
  }

  onVotedQuestion(vote: IVotedQuestion) {
    this.store.dispatch(votedQuestion({ votedQuestion: vote }));
    this.participantSocket.voteQuestionId(this.sessionId as number, vote.questionId, vote.vote);
  }

  onSliderChange(value: number) {
    this.participantSocket.sendMood(this.getSessionId() as number, this.participantId, value);
  }

  testMoodChart(){
    setInterval(() =>{
      let randomValue = Math.floor(Math.random() * (5 - (-5) + 1) + (-5));
      this.updateMoodChart(randomValue);
    }, 1000);
  }

  updateMoodChart(value: number){
    this.moodLineValues[AVERAGE_LABEL] = value;
  }



}


