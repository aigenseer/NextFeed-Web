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

@Component({
  selector: 'app-paricipant-session',
  templateUrl: './paricipant-session.component.html',
  styleUrls: ['./paricipant-session.component.scss']
})
export class ParticipantSessionComponent extends AbstractSessionManagementComponent implements IAbstractSessionManagementComponent, OnInit  {

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected messageService: MessageService,
    protected sessionService: SessionService,
    protected participantSocket: ParticipantSocket,
  ){
    super(router, route, messageService, sessionService);
  }

  ngOnInit() {
    this.validateSession();
  }

  public startConnection(token: string){
    this.connectToSocket(token);
  }

  public navigateToLogin(){
    this.router.navigate(['/']);
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
    this.logOutSession();
  }

}


