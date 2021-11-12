import { Component, OnInit } from '@angular/core';
import {Question} from "../../../../model/question/question.model";
import {Participant} from "../../../../model/participant/participant.model";
import {ActivatedRoute, Router} from "@angular/router";

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
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('sessionId');
    this.sessionId = id? parseInt(id): null;
    //prüfen ob eine valide Token vorhanden ist
    if(this.sessionId===null){
      this.navigateToManagement();
      return;
    }
    //prüfen ob die ID valide ist,
    //gegebenfalls
    //anonsten logOutSession aufrufen,.
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
