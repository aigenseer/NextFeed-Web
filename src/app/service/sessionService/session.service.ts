import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {SessionData} from "../../model/sessionData/session-data.model";
import {SessionCreateData} from "../../model/sessionCreateData/session-create-data.model";
import {firstValueFrom} from "rxjs";
import {Question} from "../../model/question/question.model";
import {SessionMetadata} from "../../model/sessionMetadata/session-metadata.model";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends DefaultService{

  getInitialData(sessionId: number){
    return firstValueFrom(this.http.get<SessionData>(this.getAPIUrl()+`session/presenter/${sessionId}/initial`));
  }

  createSession(name: string){
    return firstValueFrom(this.http.post<SessionCreateData>(this.getAPIUrl()+"session/presenter/create", {name}));
  }

  getSessionsMetadata(){
    return firstValueFrom(this.http.get<SessionMetadata[]>(this.getAPIUrl()+"session/presenter/sessions/metadata"));
  }

  deleteSession(sessionId: number){
    return firstValueFrom(this.http.delete<void>(this.getAPIUrl()+`session/presenter/${sessionId}`));
  }

  createQuestion(sessionId: number, question: Question){
    return firstValueFrom(this.http.post<Question>(this.getAPIUrl()+`session/${sessionId}/question/create`, question));
  }



}
