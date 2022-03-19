import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
  selector: 'app-presenter-create-session-dialog',
  templateUrl: './presenter-create-session-dialog.component.html',
  styleUrls: ['./presenter-create-session-dialog.component.scss']
})
export class PresenterCreateSessionDialogComponent implements OnInit {

  @Input() visible: boolean = true;
  @Output() onHide: EventEmitter<string> = new EventEmitter();
  name: string = "test";

  constructor() { }

  ngOnInit(): void {
  }

  onHideDialog() {
    this.onHide.emit("");
  }

  onCreate() {
    this.onHide.emit(this.name);
  }
}
