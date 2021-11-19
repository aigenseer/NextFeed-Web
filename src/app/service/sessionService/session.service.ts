import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {SessionData} from "../../model/sessionData/session-data.model";
import {SessionCreateData} from "../../model/sessionCreateData/session-create-data.model";
import {firstValueFrom} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends DefaultService{

  getInitialData(socketId: number, token: string){
    return firstValueFrom(this.http.post<SessionData>(this.getAPIUrl()+"session/"+socketId+"/initial", { token }));
  }

  createSession(token: string){
    return firstValueFrom(this.http.post<SessionCreateData>(this.getAPIUrl()+"session/create", {token}));
  }

}
