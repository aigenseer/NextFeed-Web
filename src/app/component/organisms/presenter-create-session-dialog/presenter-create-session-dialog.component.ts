import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-presenter-create-session-dialog',
  templateUrl: './presenter-create-session-dialog.component.html',
  styleUrls: ['./presenter-create-session-dialog.component.scss']
})
export class PresenterCreateSessionDialogComponent{

  @Input() visible: boolean = true;
  @Output() onHide: EventEmitter<string> = new EventEmitter();
  name: string = "test";

  onHideDialog() {
    this.onHide.emit("");
  }

  onCreate() {
    this.onHide.emit(this.name);
  }
}
