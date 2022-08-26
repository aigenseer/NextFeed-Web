import {Question} from "../../../model/question/question.model";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Participant} from "../../../model/participant/participant.model";
import {Survey} from "../../../model/survey/survey.model";
import {DefaultSocket} from "../../defaultSocket/default.socket";

@Injectable({
  providedIn: 'root'
})
export class PresenterQuestionSocket extends DefaultSocket {

  constructor() {
    super("/socket/question-socket");
  }

  public closeQuestion(sessionId: number, question: Question){
    this.getStompClient().send(`${this.getEndpointPrefix()}/v1/admin/session/${sessionId}/question/${question.id}/close`);
  }

  public onUpdateQuestion(sessionId: number): Observable<Question>
  {
    return this.subscribe<Question>(`${this.getEndpointPrefix()}/v1/admin/session/${sessionId}/question/onupdate`);
  }

}
