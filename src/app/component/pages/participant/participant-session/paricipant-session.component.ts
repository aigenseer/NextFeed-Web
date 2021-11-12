import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Question} from "../../../../model/question/question.model";
import {Participant} from "../../../../model/participant/participant.model";

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('sessionId');
    this.sessionId = id? parseInt(id): null;
    if(this.sessionId===null){
      this.navigateToLogin();
      return;
    }
    if(window.history.state.hasOwnProperty("token")){
      let token = window.history.state.token;
      //gerade vom login gekommen
    }

    //prüfen ob die ID valide ist,
    //gegebenfalls
    //anonsten logOutSession aufrufen,.
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
