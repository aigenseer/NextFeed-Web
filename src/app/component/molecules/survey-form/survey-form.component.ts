import {Component, EventEmitter, Input, Output} from '@angular/core';


@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent {
  typeOptions = [
    {name: 'Yes No', value: 0},
    {name: 'Rating', value: 1},
    {name: 'Open Answer', value: 2}
  ];
  @Input() name: string = "";
  @Input() type: number = 0;
  @Input() question: string = "";
  @Input() duration: number = 5;
  @Input() publishResults: boolean = true;
  @Input() disabledForm: boolean = false;
  @Output() onValid: EventEmitter<boolean> = new EventEmitter();

  private isFormValid(): boolean{
    return this.name.length > 0 && this.type >= 0 && this.question.length > 0 && this.duration >= 5;
  }

  onChange() {
    this.onValid.emit(this.isFormValid());
  }

}
