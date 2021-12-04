import {Component} from '@angular/core';
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
export class AbstractSessionManagementComponent implements IAbstractSessionManagementComponent {

  sessionId: number|null = null;
  questions: Question[] = [];
  participants: Participant[] = [];

  constructor(
    protected router: Router,
    protected route: ActivatedRoute,
    protected messageService: MessageService,
    protected sessionService: SessionService,
  ){}

  protected validateSession(): Promise<void>
  {
    return new Promise(async (resolve, reject) =>{
      let id = this.route.snapshot.paramMap.get('sessionId');
      this.sessionId = id ? parseInt(id) : null;
      let token: string | null = await this.getToken();
      if(this.sessionId===null || token === null || token.trim().length === 0){
        this.navigateToLogin();
      }else {
        this.sessionService.getInitialData(this.sessionId as number, token).then(sessionData => {
          this.questions = sessionData.questions;
          this.participants = sessionData.participants;
          this.startConnection(token as string);
          resolve();
        }).catch(err => {
          this.displayErrorNotify(err.name, 'Failed to load session data');
          reject(err);
        });
      }
    })
  }

  protected getToken(): Promise<string|null>{
    return Promise.resolve(null)
  }

  protected logOutSession(){
    this.navigateToLogin();
    this.sessionId = null;
    this.questions = [];
    this.participants = [];
  }

  public navigateToLogin(){}

  public startConnection(token: string){}

  protected displayNotify(message: Message){
    this.messageService.add(message);
  }

  protected displayErrorNotify(detail: string, summary = "Fatal Error"){
    this.displayNotify({ severity: 'error', summary: summary, detail: detail, life: 4000 });
  }

  protected displayErrorObjectNotify(err: Error){
    this.displayErrorNotify(err.name);
  }

  protected addQuestion(question: Question){
    this.questions.push(question);
  }

}
