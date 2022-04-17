import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {EnvironmentService} from "../../../service/environmentService/environment.service";
import {EnvironmentInfo} from "../../../model/environmentInfo/environment-info.model";

@Component({
  selector: 'app-share-session-code-dialog',
  templateUrl: './share-session-code-dialog.component.html',
  styleUrls: ['./share-session-code-dialog.component.scss']
})
export class ShareSessionCodeDialogComponent implements OnChanges{

  @Input() sessionCode: string = "";
  @Input() sessionId: number|null = 0;
  @Input() visible: boolean = false;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter();
  @Output() onHide: EventEmitter<void> = new EventEmitter();
  environmentInfo: EnvironmentInfo|null = null;

  constructor(
    private readonly environmentService: EnvironmentService) {
    this.environmentService.getEnvironmentInfo().then(info => {
      this.environmentInfo = info;
    })
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes.hasOwnProperty("visible")){
      this.visible = changes.visible.currentValue;
    }
  }

  getShareLink(){
    return `${location.protocol}//${this.environmentInfo?.routingIpInterface}:${location.port}/#/participant/join/${this.sessionId}`
  }

  onHideDialog() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
    this.onHide.emit();
  }
}
