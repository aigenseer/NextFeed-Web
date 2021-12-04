import {Component, Input, OnInit} from '@angular/core';
import {Question} from "../../../model/question/question.model";
import {ICustomColumnHeader} from "../../molecules/question-table-overview/question-table-overview.component";

@Component({
  selector: 'app-participant-question-table',
  templateUrl: './participant-question-table.component.html',
  styleUrls: ['./participant-question-table.component.scss']
})
export class ParticipantQuestionTableComponent{

  @Input() questions: Question[] = [];
  customColumnHeaders: ICustomColumnHeader[] = [
    {
      title: "Custom"
    }
  ]

}
