import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'app-survey-selector-dialog',
  templateUrl: './survey-selector-dialog.component.html',
  styleUrls: ['./survey-selector-dialog.component.scss']
})
export class SurveySelectorDialogComponent implements OnInit {

  @Input() visible: boolean = true

  constructor() { }

  ngOnInit(): void {
  }

  onSubmit() {

  }
}
