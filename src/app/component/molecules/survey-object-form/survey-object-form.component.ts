import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ISurveyEntityTemplate, SurveyEntityType} from "../../../model/surveyEntity/survey-entity.model";

@Component({
  selector: 'app-survey-object-form',
  templateUrl: './survey-object-form.component.html',
  styleUrls: ['./survey-object-form.component.scss']
})
export class SurveyObjectFormComponent {

  @Input() template: ISurveyEntityTemplate = {
    name: "",
    type: SurveyEntityType.YesNo,
    duration: 5,
    question: "",
    publishResults: true
  };
  @Output() templateChange: EventEmitter<ISurveyEntityTemplate> = new EventEmitter();
  @Output() onValid: EventEmitter<boolean> = new EventEmitter();


  onChange(valid: boolean) {
    this.templateChange.emit(this.template);
    this.onValid.emit(valid);
  }
}
