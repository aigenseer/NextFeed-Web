import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey/survey.model";
import {SurveyService} from "../../../service/surveyService/survey.service";
import {ISurveyTemplate, SurveyTemplate} from "../../../model/surveyTemplate/survey-template.model";

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

  constructor(
    private readonly surveyService: SurveyService
  ){}

  ngOnInit(): void {
    this.surveyService.getTemplatesBySessionId(this.sessionId).then(templates => {
      this.templates = templates;
    });
    this.surveyService.getSurveysBySessionId(this.sessionId).then(surveys => {
      this.surveys = surveys;
      console.log(surveys)
    });
  }

  onClickNew() {
    this.visibleSelectorDialog = true
  }

  onCreateSurveyByTemplate(templ: ISurveyTemplate) {
    this.surveyService.createByTemplate(this.sessionId, templ).then(template => {
      this.templates.push(template);
    });
  }

  onCreateBySelectTemplateId(id: number) {
    this.surveyService.createByTemplateId(this.sessionId, id).then(template => {

    });
  }

}
