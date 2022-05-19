import { Injectable } from '@angular/core';
import {Observable, Subscriber} from "rxjs";
import {Survey} from "../../model/survey/survey.model";

@Injectable({
  providedIn: 'root'
})
export class SurveyListenerService {


  private observersWaitForSurveys: Subscriber<Survey>[] = []

  public onNewSurvey(survey: Survey)
  {
    this.observersWaitForSurveys.forEach((s) => s.next(survey));
  }

  public survey(){
    return new Observable<Survey>(observer => {
      this.observersWaitForSurveys.push(observer);
    });
  }



}
