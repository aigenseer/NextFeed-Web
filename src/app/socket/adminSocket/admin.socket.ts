import {DefaultSocket} from "../defaultSocket/default.socket";
import {Question} from "../../model/question/question.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Participant} from "../../model/participant/participant.model";

@Injectable({
  providedIn: 'root'
})
export class AdminSocket extends DefaultSocket {

  public onQuestion(): Observable<Question>
  {
    return this.subscribe<Question>('/admin/question')
  }

  public onJoinParticipant(sessionId: number): Observable<Participant>
  {
    return this.subscribe<Participant>('/admin/session/'+sessionId+'/user/onjoin');
  }

  public closeQuestion(sessionId: number, question: Question){
    this.getStompClient().send(`/admin/session/${sessionId}/question/${question.id}/close`);
  }

  public onUpdateQuestion(sessionId: number): Observable<Question>
  {
    return this.subscribe<Question>(`/admin/session/${sessionId}/question/onupdate`);
  }

  public onUpdateMood(sessionId: number){
    return this.subscribe<number>(`/admin/session/${sessionId}/mood/onupdate`);
  }

}
