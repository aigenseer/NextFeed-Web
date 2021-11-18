import {DefaultSocket} from "../defaultSocket/default.socket";
import {Question} from "../../model/question/question.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Participant} from "../../model/participant/participant.model";

@Injectable({
  providedIn: 'root'
})
export class ParticipantSocket extends DefaultSocket {

  async connect(token: string) {
    try {
      const frame = await super.connect(token);
      return Promise.resolve(frame);
    }catch (err){
      return Promise.reject(err);
    }
  }

  addQuestion(question: Question){
    this.getStompClient().send("/admin/question/add", {}, question.text);
  }

  public onQuestion(): Observable<Question>
  {
    return this.subscribe<Question>('/admin/question')
  }

  public onJoinParticipant(sessionId: number): Observable<Participant>
  {
    return this.subscribe<Participant>('/participant/session/'+sessionId+'/user/onjoin');
  }

}
