import {Component, OnInit} from '@angular/core';
import {Participant} from "../../../../model/participant/participant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";
import {SessionService} from "../../../../service/sessionService/session.service";
import {
  AbstractSessionManagementComponent,
  IAbstractSessionManagementComponent
} from "../../../organisms/abstract-session-management/abstract-session-management.component";

@Component({
  selector: 'app-presenter-session',
  templateUrl: './presenter-session.component.html',
  styleUrls: ['./presenter-session.component.scss']
})
export class PresenterSessionComponent extends AbstractSessionManagementComponent implements IAbstractSessionManagementComponent, OnInit  {

  sessionCode: string = "test123"
  displayShareCodeDialog: boolean = true

  constructor(
    protected  router: Router,
    protected  route: ActivatedRoute,
    protected  messageService: MessageService,
    protected  sessionService: SessionService,
    protected  adminSocket: AdminSocket,
  ) {
    super(router, route, messageService, sessionService);
  }

  ngOnInit(){
    this.validateSession().then(_ => {


    })
  }

  getShareLink(){
    return location.origin+"/participant/?sessionId="+this.sessionId;
  }

  public startConnection(token: string){
    this.connectToSocket(token);
  }

  private connectToSocket(token: string){
    this.adminSocket.connect(token).then(() => {
      this.adminSocket.onJoinParticipant(this.sessionId as number).subscribe(this.onJoinParticipant);
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
    this.logOutSession();
  }

  onHideShareCodeDialog(){
    this.displayShareCodeDialog = false;
  }

}
