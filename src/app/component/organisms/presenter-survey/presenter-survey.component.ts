import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey/survey.model";
import {SurveyService} from "../../../service/surveyService/survey.service";
import {ISurveyTemplate, SurveyTemplate, SurveyType} from "../../../model/surveyTemplate/survey-template.model";
import {SurveyListenerService} from "../../../service/surveyListenerService/survey-listener.service";

@Component({
  selector: 'app-presenter-survey',
  templateUrl: './presenter-survey.component.html',
  styleUrls: ['./presenter-survey.component.scss']
})
export class PresenterSurveyComponent implements OnInit {

  @Input() sessionId: number = 0;
  templates: SurveyTemplate[] = [];
  surveys: Survey[] = [];
  visibleSelectorDialog: boolean = false;
  currentSurvey: Survey|null = null;
  currentSurveyDisplayResult: boolean = false;

  constructor(
    private readonly surveyService: SurveyService,
    private readonly surveyListenerService: SurveyListenerService
  ){}

  ngOnInit(): void {
    this.surveyListenerService.survey().subscribe(survey => {
      this.currentSurvey = survey;
      if(survey.timestamp === 0){
        this.currentSurveyDisplayResult = false;
      }else{
        this.currentSurveyDisplayResult = true;
        this.surveys = [...this.surveys, survey];
      }
    });

    this.surveyService.getTemplatesBySessionId(this.sessionId).then(templates => {
      this.templates = templates;
    });
    this.surveyService.getSurveysBySessionId(this.sessionId).then(surveys => {
      this.surveys = surveys;
    });
  }

  onClickNew() {
    this.visibleSelectorDialog = true
  }

  onCreateSurveyByTemplate(templ: ISurveyTemplate) {
    this.surveyService.createByTemplate(this.sessionId, templ).then(template => {
      this.templates = [...this.templates, template];
    });
  }

  onCreateBySelectTemplateId(id: number) {
    this.surveyService.createByTemplateId(this.sessionId, id);
  }

  onCloseCurrentSurvey() {
    this.currentSurvey = null;
  }

  onClickMinimize() {
    if(this.currentSurvey !== null) {
      this.currentSurvey.background = true;
      this.surveyListenerService.onNewSurvey(this.currentSurvey);
    }
  }
}
