import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey/survey.model";
import {SurveyType} from "../../../model/surveyTemplate/survey-template.model";

@Component({
  selector: 'app-survey-answer-visualization',
  templateUrl: './survey-answer-visualization.component.html',
  styleUrls: ['./survey-answer-visualization.component.scss']
})
export class SurveyAnswerVisualizationComponent implements OnInit{

  @Input() survey: Survey|null = null

  private isType(needed: SurveyType){
    return this.survey?.template.type === needed;
  }

  isYesNoType(){
    return this.isType(SurveyType.YesNo);
  }

  isRatingType(){
    return this.isType(SurveyType.Rating);
  }

  isOpenAnswerType(){
    return this.isType(SurveyType.OpenAnswer);
  }

  ngOnInit(): void {
    //console.log(this.survey, this.isOpenAnswerType())
  }


}
