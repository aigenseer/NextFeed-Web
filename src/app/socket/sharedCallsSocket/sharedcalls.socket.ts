import {DefaultSocket} from "../defaultSocket/default.socket";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {SurveyTemplate} from "../../model/surveyTemplate/survey-template.model";
import {Survey} from "../../model/survey/survey.model";

@Injectable({
  providedIn: 'root'
})
export class SharedCallsSocket extends DefaultSocket {

  public onCloseSurvey(sessionId: number, surveyId: number): Observable<number>
  {
    return this.subscribe<number>(`/session/${sessionId}/survey/${surveyId}/onclose`);
  }

  protected castSurvey(v: Survey){
    console.log(v, new Survey(v.id, this.castSurveyTemplate(v.template), v.answers, v.timestamp))
    return new Survey(v.id, this.castSurveyTemplate(v.template), v.answers, v.timestamp);
  }

  protected castSurveyTemplate(v: SurveyTemplate){
    return new SurveyTemplate(v.id, v.name, v.type, v.question, v.duration, v.publishResults);
  }

}
