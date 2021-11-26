import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-share-session-code-dialog',
  templateUrl: './share-session-code-dialog.component.html',
  styleUrls: ['./share-session-code-dialog.component.scss']
})
export class ShareSessionCodeDialogComponent {

  @Input() sessionCode: string = "";
  @Input() sessionId: number|null = 0;
  @Input() visible: boolean = false;
  @Output() onHide: EventEmitter<void> = new EventEmitter();

  getShareLink(){
    return location.origin+"/participant/join/"+this.sessionId;
  }

  onHideDialog() {
    this.onHide.emit();
  }
}
