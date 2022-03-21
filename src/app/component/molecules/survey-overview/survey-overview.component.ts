import {Component, Input, OnInit} from '@angular/core';
import {Survey} from "../../../model/survey/survey.model";

@Component({
  selector: 'app-survey-overview',
  templateUrl: './survey-overview.component.html',
  styleUrls: ['./survey-overview.component.scss']
})
export class SurveyOverviewComponent implements OnInit {

  @Input() surveys: Survey[] = [];

  constructor() { }

  ngOnInit(): void {

  }

}
