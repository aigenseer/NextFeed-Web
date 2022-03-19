import {Component, EventEmitter, OnDestroy, Output} from '@angular/core';
import {Options} from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-participant-mood-slider',
  templateUrl: './participant-mood-slider.component.html',
  styleUrls: ['./participant-mood-slider.component.scss']
})
export class ParticipantMoodSliderComponent implements OnDestroy{

  private interval: NodeJS.Timeout|null = null;
  @Output() onChange: EventEmitter<number> = new EventEmitter();
  @Output() onUserChange: EventEmitter<number> = new EventEmitter();

  value: number = 0;
  options: Options = {
    floor: -5,
    ceil: 5,
    vertical: true
  };

  ngOnDestroy(): void {
    this.stopInterval();
  }

  private startInterval(){
    this.interval = setInterval(() => {
      if(this.value > 0) this.value -= 1;
      if(this.value < 0) this.value += 1;
      if(this.value === 0) this.stopInterval();
      this.onChange.emit(this.value);
    }, 1000);
  }

  private stopInterval(){
    if(this.interval !== null){
      clearInterval(this.interval);
    }
  }

  userChangeEnd() {
    this.onUserChange.emit(this.value);
    this.startInterval();
  }
}
