import { Component, OnInit } from '@angular/core';
import {SurveyListenerService} from "../../../service/surveyListenerService/survey-listener.service";
import {Survey} from "../../../model/survey/survey.model";

@Component({
  selector: 'app-survey-fab',
  templateUrl: './survey-fab.component.html',
  styleUrls: ['./survey-fab.component.scss']
})
export class SurveyFabComponent implements OnInit {

  currentSurvey: Survey|null = null;

  constructor(private readonly surveyListenerService: SurveyListenerService) { }

  ngOnInit(): void {
    this.surveyListenerService.survey().subscribe(survey => {
      if(survey.timestamp === 0){
        this.currentSurvey = survey;
      }else{
        this.currentSurvey = null;
      }
      this.currentSurvey = survey;
    });
  }

  onClickOpen() {
    if(this.currentSurvey !== null) {
      this.currentSurvey.background = false;
      this.surveyListenerService.onNewSurvey(this.currentSurvey);
    }
  }
}
