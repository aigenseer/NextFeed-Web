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
import {removeToken} from "../../../../state/participant/participant.actions";


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
      this.questionIds = questionIds;
    });
  }

  public startConnection(token: string){
    this.loadData();
    this.store.select(selectQuestionIds).subscribe(questionIds => {
      questionIds.map(id => this.questionIds.push(id));
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
      this.participantSocket.onJoinParticipant(this.sessionId as number).subscribe(this.onJoinParticipant, this.displayErrorObjectNotify);
    });
  }

  private onJoinParticipant(participant: Participant){
    this.participants.push(participant);
    this.displayNotify({ severity: 'info', summary: 'User joined', detail: participant.nickname, life: 2000 });
  }

  onClickLogout(){
    this.store.dispatch(removeToken());
    this.logOutSession();
  }

}


