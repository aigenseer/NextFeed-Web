import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {SessionData} from "../../model/sessionData/session-data.model";
import {SessionCreateData} from "../../model/session-create-data.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends DefaultService{

  getInitialData(socketId: number, token: string){
    return this.http.post<SessionData>(this.getAPIUrl()+"session/"+socketId+"/initial", { token }).toPromise();
  }

  createSession(){
    return this.http.get<SessionCreateData>(this.getAPIUrl()+"session/create").toPromise();
  }

}
