import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {Token} from "../../model/token/token.model";
import {firstValueFrom} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends DefaultService{

  getPresenterToken(){
    return firstValueFrom(this.http.get<Token>(this.getAPIUrl()+"authorization-service/v1/test/auth"));
  }

  getParticipantToken(sessionId: number, nickname: string, sessionCode: string){
    return firstValueFrom(this.http.post<Token>(this.getAPIUrl()+"authorization-service/v1/participant/auth", {sessionId, nickname, sessionCode}));
  }

}
