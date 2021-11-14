import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../../model/question/question.model";
import {Participant} from "../../../../model/participant/participant.model";
import {ParticipantSocket} from "../../../../socket/participantSocket/participant.socket";
import {MessageService} from "primeng/api";
import {SessionService} from "../../../../service/sessionService/session.service";

@Component({
  selector: 'app-paricipant-session',
  templateUrl: './paricipant-session.component.html',
  styleUrls: ['./paricipant-session.component.scss']
})
export class ParticipantSessionComponent implements OnInit {

  sessionId: number|null = null;
  questions: Question[] = [];
  participants: Participant[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private participantSocket: ParticipantSocket,
    private messageService: MessageService,
    private sessionService: SessionService,
    ){}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('sessionId');
    this.sessionId = id ? parseInt(id) : null;
    let token: string | null = null;
    token = "token" // token muss über den global store bezogen werden.

    if(this.sessionId===null && token !== null){
      this.navigateToLogin();
      return;
    }
    if (!window.history.state.hasOwnProperty("newSession")){
      this.sessionService.getInitialData(this.sessionId as number, token).subscribe(sessionData => {
        this.questions = sessionData.questions;
        this.participants = sessionData.participants;
        this.startConnection(token as string);
      });
    }else{
      this.connectToSocket(token);
    }
  }

  private startConnection(token: string){
    this.connectToSocket(token);
  }

  private connectToSocket(token: string){
    this.participantSocket.connect(token).then(() => {
      this.participantSocket.onJoinParticipant(this.sessionId as number).subscribe(this.onJoinParticipant);
    });
  }

  private onJoinParticipant(participant: Participant){
    this.participants.push(participant);
    this.messageService.add({ severity: 'info', summary: 'User joined', detail: participant.nickname, life: 2000 });
  }

  private logOutSession(){
    this.sessionId = null;
    this.questions = [];
    this.participants = [];
    this.navigateToLogin();
  }

  private navigateToLogin(){
    this.router.navigate(['']);
  }

  onClickLogout(){
    this.logOutSession();
  }

}
