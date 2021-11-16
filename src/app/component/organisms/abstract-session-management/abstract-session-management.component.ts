import {Component, OnInit} from '@angular/core';
import {Question} from "../../../model/question/question.model";
import {Participant} from "../../../model/participant/participant.model";
import {ActivatedRoute, Router} from "@angular/router";
import {MessageService, Message} from "primeng/api";
import {SessionService} from "../../../service/sessionService/session.service";

export interface IAbstractSessionManagementComponent{
  navigateToLogin(): void;
  startConnection(token: string): void;
}


@Component({ template: '' })
export class AbstractSessionManagementComponent implements OnInit, IAbstractSessionManagementComponent {

  sessionId: number|null = null;
  questions: Question[] = [];
  participants: Participant[] = [];

  constructor(
    protected  router: Router,
    protected  route: ActivatedRoute,
    protected  messageService: MessageService,
    protected  sessionService: SessionService,
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
    this.sessionService.getInitialData(this.sessionId as number, token).then(sessionData => {
      this.questions = sessionData.questions;
      this.participants = sessionData.participants;
      this.startConnection(token as string);
    }).catch(err => {
      this.displayNotify({ severity: 'error', summary: 'Failed to load session data', detail: err.name, life: 4000 });
    });
  }

  protected logOutSession(){
    this.sessionId = null;
    this.questions = [];
    this.participants = [];
    this.navigateToLogin();
  }

  public navigateToLogin(){}

  public startConnection(token: string){}

  protected displayNotify(message: Message){
    this.messageService.add(message);
  }


}
