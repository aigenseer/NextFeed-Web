import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Survey} from "../../../model/survey/survey.model";
import {DefaultSocket} from "../../defaultSocket/default.socket";
import {SurveyUtils} from "../../utils/SurveyUtils";

@Injectable({
  providedIn: 'root'
})
export class PresenterSurveySocket extends DefaultSocket {

  constructor(private readonly surveyUtils: SurveyUtils) {
    super("/socket/survey-socket");
  }

  public onUpdateSurvey(sessionId: number, surveyId: number): Observable<Survey>
  {
    return this.subscribe<Survey>(`${this.getEndpointPrefix()}/v1/admin/session/${sessionId}/survey/${surveyId}/onupdate`)
      .pipe(
        map(v => this.surveyUtils.castSurvey(v))
      );
  }

  public onSurveyResult(sessionId: number, surveyId: number){
    return this.subscribe<Survey>(`${this.getEndpointPrefix()}/v1/admin/session/${sessionId}/survey/${surveyId}/onresult`)
      .pipe(
        map(v => this.surveyUtils.castSurvey(v))
      );
  }

  public onCreateSurvey(sessionId: number): Observable<Survey>
  {
    return this.subscribe<Survey>(`/socket/survey-socket/v1/admin/session/${sessionId}/survey/oncreate`).pipe(
      map((v: Survey) => {
        console.log(v)
        return this.surveyUtils.castSurvey(v);
      })
      // map((v: Survey) => this.surveyUtils.castSurvey(v))
    );
  }

}
