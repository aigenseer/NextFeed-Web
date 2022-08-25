import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {Token} from "../../model/token/token.model";
import {firstValueFrom} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends DefaultService{

  getAdminToken(){
    return firstValueFrom(this.http.get<Token>(this.getAPIUrl()+"obsolet-service/v1/auth/admin"));
  }

  getParticipantToken(sessionId: number, nickname: string, sessionCode: string){
    return firstValueFrom(this.http.post<Token>(this.getAPIUrl()+"obsolet-service/v1/auth/participant", {sessionId, nickname, sessionCode}));
  }

}
