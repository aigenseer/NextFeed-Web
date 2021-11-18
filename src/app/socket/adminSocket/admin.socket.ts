import {DefaultSocket} from "../defaultSocket/default.socket";
import {Question} from "../../model/question/question.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Participant} from "../../model/participant/participant.model";

@Injectable({
  providedIn: 'root'
})
export class AdminSocket extends DefaultSocket {

  async connect(token: string) {
    try {
      const frame = await super.connect(token);
      return Promise.resolve(frame);
    }catch (err){
      return Promise.reject(err);
    }
  }

  public onQuestion(): Observable<Question>
  {
    return this.subscribe<Question>('/admin/question')
  }

  public onJoinParticipant(sessionId: number): Observable<Participant>
  {
    return this.subscribe<Participant>('/admin/session/'+sessionId+'/user/onjoin');
  }

}
