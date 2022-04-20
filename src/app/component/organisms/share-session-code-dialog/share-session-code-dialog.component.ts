import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {EnvironmentService} from "../../../service/environmentService/environment.service";
import {EnvironmentInfo} from "../../../model/environmentInfo/environment-info.model";
import { Options } from 'ngx-qrcode-styling';

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

  public config: Options = {
    "width":300,"height":300,
    "margin":0,
    "qrOptions":{"typeNumber":0,"mode":"Byte","errorCorrectionLevel":"Q"},
    "imageOptions":{"hideBackgroundDots":true,"imageSize":0.4,"margin":0},
    "dotsOptions":{"type":"rounded","color":"#1a6b41","gradient":{"type":"radial","rotation":0,"colorStops":[{"offset":0,"color":"#009688"},{"offset":1,"color":"#004942"}]}},
    "backgroundOptions":{"color":"#ffffff","gradient":undefined},
    "image":"src/assets/lecturefeed_logo.svg",
    "dotsOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#6a1a4c","color2":"#6a1a4c","rotation":"0"}},
    "cornersSquareOptions":{"type":"extra-rounded","color":"#006a61","gradient":undefined},
    "cornersSquareOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},
    "cornersDotOptions":{"type":undefined,"color":"#1b4f46"},
    "cornersDotOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#000000","color2":"#000000","rotation":"0"}},
    "backgroundOptionsHelper":{"colorType":{"single":true,"gradient":false},"gradient":{"linear":true,"radial":false,"color1":"#ffffff","color2":"#ffffff","rotation":"0"}}
}

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
