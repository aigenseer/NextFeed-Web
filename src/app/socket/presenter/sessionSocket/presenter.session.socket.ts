import {Injectable} from "@angular/core";
import {Observable} from "rxjs";
import {Participant} from "../../../model/participant/participant.model";
import {DefaultSocket} from "../../defaultSocket/default.socket";

@Injectable({
  providedIn: 'root'
})
export class PresenterSessionSocket extends DefaultSocket {

  constructor() {
    super("/socket/session-socket");
  }

  public onClose(sessionId: number): Observable<void>
  {
    return this.subscribe<void>(`${this.getEndpointPrefix()}/v1/session/${sessionId}/onclose`);
  }

  public onJoinParticipant(sessionId: number): Observable<Participant>
  {
    return this.subscribe<Participant>(`${this.getEndpointPrefix()}/v1/admin/session/${sessionId}/user/onjoin`);
  }

  public onParticipantConnectionStatus(sessionId: number)
  {
    return this.subscribe<Participant[]>(`${this.getEndpointPrefix()}/v1/admin/session/${sessionId}/participant/connections/status`);
  }

  public onUpdateMood(sessionId: number){
    return this.subscribe<number>(`${this.getEndpointPrefix()}/v1/admin/session/${sessionId}/mood/onupdate`);
  }


}
