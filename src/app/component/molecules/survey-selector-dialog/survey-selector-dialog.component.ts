import {Component, Input, OnInit} from '@angular/core';
import {ISurveyEntityTemplate, SurveyEntityType} from "../../../model/surveyEntity/survey-entity.model";

@Component({
  selector: 'app-survey-selector-dialog',
  templateUrl: './survey-selector-dialog.component.html',
  styleUrls: ['./survey-selector-dialog.component.scss']
})
export class SurveySelectorDialogComponent implements OnInit {

  @Input() visible: boolean = true
  template: ISurveyEntityTemplate = {
    name: "Tets",
    type: SurveyEntityType.YesNo,
    duration: 5,
    question: "",
    publishResults: true
  };

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }

  onTemplateValid(valid: boolean) {
    console.log(this.template)
  }

}
