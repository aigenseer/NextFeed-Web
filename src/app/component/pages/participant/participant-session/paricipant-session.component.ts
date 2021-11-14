import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../../model/question/question.model";
import {Participant} from "../../../../model/participant/participant.model";
import {ParticipantSocket} from "../../../../socket/participantSocket/participant.socket";
import {MessageService} from "primeng/api";

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
    ){}

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('sessionId');
    this.sessionId = id ? parseInt(id) : null;
    if (this.sessionId === null) {
      this.navigateToLogin();
      return;
    }
    let token: string | null = null;
    if (window.history.state.hasOwnProperty("token")) {
      token = window.history.state.token;
      //gerade vom login gekommen
    }

    //prüfen ob die ID valide ist,
    //gegebenfalls
    //anonsten logOutSession aufrufen,.
    if (token !== null) this.connectToSocket(token);
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
