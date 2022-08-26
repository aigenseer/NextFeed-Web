import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Participant} from "../../../model/participant/participant.model";
import {DefaultSocket} from "../../defaultSocket/default.socket";

@Injectable({
  providedIn: 'root'
})
export class ParticipantSessionSocket extends DefaultSocket {

  constructor() {
    super("/socket/session-socket");
  }

  public onJoinParticipant(sessionId: number): Observable<Participant>
  {
    return this.subscribe<Participant>(`${this.getEndpointPrefix()}/v1/participant/session/${sessionId}/user/onjoin`);
  }

  public sendMood(sessionId: number, value: number){
    this.getStompClient().send(`${this.getEndpointPrefix()}/v1/participant/session/${sessionId}/mood/${value}`, {});
  }

  public onUpdateMood(sessionId: number){
    return this.subscribe<number>(`${this.getEndpointPrefix()}/v1/participant/session/${sessionId}/mood/onupdate`);
  }

  public onClose(sessionId: number): Observable<void>
  {
    return this.subscribe<void>(`${this.getEndpointPrefix()}/v1/session/${sessionId}/onclose`);
  }

}
