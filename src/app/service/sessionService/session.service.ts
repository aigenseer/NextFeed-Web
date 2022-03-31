import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {SessionData} from "../../model/sessionData/session-data.model";
import {SessionCreateData} from "../../model/sessionCreateData/session-create-data.model";
import {firstValueFrom, map, Observable} from "rxjs";
import {Question} from "../../model/question/question.model";
import {SessionMetadata} from "../../model/sessionMetadata/session-metadata.model";
import {SurveyTemplate} from "../../model/surveyTemplate/survey-template.model";
import {Survey} from "../../model/survey/survey.model";
import {Session} from "../../model/session/session.model";
import {Participant} from "../../model/participant/participant.model";
import {HttpResponse} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class SessionService extends DefaultService{

  getInitialData(sessionId: number){
    return firstValueFrom(this.http.get<SessionData|null>(this.getAPIUrl()+`session/${sessionId}/initial`));
  }

  createSession(name: string){
    return firstValueFrom(this.http.post<SessionCreateData>(this.getAPIUrl()+"session/presenter/create", {name}));
  }

  closeSession(sessionId: number){
    return firstValueFrom(this.http.get<void>(this.getAPIUrl()+`session/presenter/${sessionId}/close`));
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

  getSession(sessionId: number){
    return firstValueFrom(this.http.get<Session>(this.getAPIUrl()+`session/presenter/${sessionId}/data`)
      .pipe(
        map((v: Session) => {
          let participants: Participant[] = v.participants.map(p => new Participant(p.id, p.nickname));
          let questions: {[key: string]: Question} = {};
          for (const q of Object.values(v.questions)) {
            questions[String(q.id)] = new Question(q.id, q.participantId, q.message, q.rating, q.created, q.closed);
          }
          let surveys: {[key: string]: Survey} = {};
          for (const s of Object.values(v.surveys)) {
            let template = new SurveyTemplate(s.template.id, s.template.name, s.template.type, s.template.question, s.template.duration, s.template.publishResults);
            surveys[String(s.id)] = new Survey(s.id, template, s.answers, s.timestamp);
          }
          return new Session(v.id, v.name, v.sessionCode, participants, questions, surveys, v.closed);
        })
      ));
  }

  getSessionCSVZip(sessionId: number)
  {
    return firstValueFrom(this.http.get(this.getAPIUrl()+`session/presenter/${sessionId}/data/download`, { responseType: 'blob', observe: 'response' }).pipe(
      map(res => res.body)
    ));
  }





}
