import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Survey} from "../../../model/survey/survey.model";

@Component({
  selector: 'app-survey-result-visualization-dialog',
  templateUrl: './survey-result-visualization-dialog.component.html',
  styleUrls: ['./survey-result-visualization-dialog.component.scss']
})
export class SurveyResultVisualizationDialogComponent {

  @Input() survey: Survey|null = null;
  @Output() templateChange: EventEmitter<Survey|null> = new EventEmitter();
  @Output() onClose: EventEmitter<void> = new EventEmitter();

  isVisible() {
    return this.survey !== null;
  }
}
