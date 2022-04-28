import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {Survey} from "../../../model/survey/survey.model";
import {SurveyTemplate} from "../../../model/surveyTemplate/survey-template.model";

@Component({
  selector: 'app-survey-live-view-dialog',
  templateUrl: './survey-live-view-dialog.component.html',
  styleUrls: ['./survey-live-view-dialog.component.scss']
})
export class SurveyLiveViewDialogComponent implements OnChanges {

  @Input() displayResult: boolean = false;
  @Output() displayResultChange: EventEmitter<boolean> = new EventEmitter();
  @Input() survey: Survey|null = null;
  @Output() surveyChange: EventEmitter<Survey|null> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  @Input()  enableMinimize: boolean = false;
  @Output() onClickMinimize: EventEmitter<boolean> = new EventEmitter();

  private currentTime: number = 0;
  private timer: NodeJS.Timeout | undefined;
  progressBarValue: number = 100;

  isVisible(){
    return this.survey !== null && !this.survey.background;
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty("survey")){
      if(changes.survey.currentValue === null){
        this.survey = null;
      }else{
        this.progressBarValue = 100;
        this.survey = changes.survey.currentValue;
        this.currentTime = 0;
        this.startTimer(this.survey?.template?.duration as number);
      }
    }
  }

  startTimer(maxTime: number){
    this.timer = setInterval(() => {
      if(this.currentTime >= maxTime){
        clearInterval(this.timer as NodeJS.Timeout);
      }else{
        this.currentTime += 1;
        this.progressBarValue = Number((100 - this.currentTime / maxTime * 100).toFixed(2));
      }
    }, 1000);
  }

  onHide() {
    this.onClose.emit()
  }

  clickMinimize() {
    this.onClickMinimize.emit();
  }
}
