import {Injectable} from "@angular/core";
import {SurveyTemplate} from "../../model/surveyTemplate/survey-template.model";
import {Survey} from "../../model/survey/survey.model";

@Injectable({
  providedIn: 'root'
})
export class SurveyUtils {

  public castSurvey(v: Survey){
    return new Survey(v.id, this.castSurveyTemplate(v.template), v.answers, v.timestamp);
  }

  public castSurveyTemplate(v: SurveyTemplate){
    return new SurveyTemplate(v.id, v.name, v.type, v.question, v.duration, v.publishResults);
  }

}
