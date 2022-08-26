import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Survey} from "../../../model/survey/survey.model";
import {DefaultSocket} from "../../defaultSocket/default.socket";
import {SurveyUtils} from "../../utils/SurveyUtils";
import {SurveyTemplate} from "../../../model/surveyTemplate/survey-template.model";

@Injectable({
  providedIn: 'root'
})
export class ParticipantSurveySocket extends DefaultSocket {

  constructor(private readonly surveyUtils: SurveyUtils) {
    super("/socket/survey-socket");
  }
  
  public onSurveyResult(sessionId: number, surveyId: number){
    return this.subscribe<Survey>(`${this.getEndpointPrefix()}/v1/participant/session/${sessionId}/survey/${surveyId}/onresult`)
      .pipe(
        map(v => this.surveyUtils.castSurvey(v))
      );
  }

  public onCreateSurvey(sessionId: number): Observable<{surveyId: number, surveyTemplate: SurveyTemplate}>
  {
    return this.subscribe<{surveyId: number, surveyTemplate: SurveyTemplate}>(`${this.getEndpointPrefix()}/v1/participant/session/${sessionId}/survey/oncreate`).pipe(
      map((data: {surveyId: number, surveyTemplate: SurveyTemplate}) =>  ({surveyId: data.surveyId, surveyTemplate: this.surveyUtils.castSurveyTemplate(data.surveyTemplate)}))
    );
  }

}
