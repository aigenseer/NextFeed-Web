import { Component, OnInit } from '@angular/core';
import {Question} from "../../../../model/question/question.model";
import {Participant} from "../../../../model/participant/participant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService} from "primeng/api";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";
import {SessionService} from "../../../../service/sessionService/session.service";

@Component({
  selector: 'app-admin-session',
  templateUrl: './admin-session.component.html',
  styleUrls: ['./admin-session.component.scss']
})
export class AdminSessionComponent implements OnInit {

  sessionId: number|null = null;
  questions: Question[] = [];
  participants: Participant[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private adminSocket: AdminSocket,
    private messageService: MessageService,
    private sessionService: SessionService,
  ){}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('sessionId');
    this.sessionId = id? parseInt(id): null;
    let token: string | null = null;
    //prüfen ob eine valide Token vorhanden ist
    token = "token" // token muss über den global store bezogen werden.

    if(this.sessionId===null && token !== null){
      this.navigateToManagement();
      return;
    }
    if (!window.history.state.hasOwnProperty("newSession")){
      this.sessionService.getInitialData(this.sessionId as number, token).subscribe(sessionData => {
        this.questions = sessionData.questions;
        this.participants = sessionData.participants;
        this.startConnection(token as string);
      });
    }else{
      this.startConnection(token);
    }
  }

  private startConnection(token: string){
    this.connectToSocket(token);
  }

  private connectToSocket(token: string){
    this.adminSocket.connect(token).then(() => {
      this.adminSocket.onJoinParticipant(this.sessionId as number).subscribe(this.onJoinParticipant);
    });
  }

  private onJoinParticipant(participant: Participant){
    this.participants.push(participant);
    this.messageService.add({ severity: 'info', summary: 'User joined', detail: participant.nickname, life: 2000 });
  }

  private closeSession(){
    this.sessionId = null;
    this.questions = [];
    this.participants = [];
    this.navigateToManagement();
  }

  private navigateToManagement(){
    this.router.navigate(['/admin']);
  }

  onClickCloseSession(){
    this.closeSession();
  }

}
