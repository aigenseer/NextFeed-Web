import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import moment from "moment";

export interface IMoodLineValue{
  label: string
  value: number
}

interface IMoodValue{
  time: Date,
  lines: IMoodLineValue[]
}

@Component({
  selector: 'app-participant-mood-chart',
  templateUrl: './participant-mood-chart.component.html',
  styleUrls: ['./participant-mood-chart.component.scss']
})
export class ParticipantMoodChartComponent implements OnInit, OnDestroy {

  @Input() moodLineValues: {[key: string]: number} = {};
  private moodValues: IMoodValue[] = [];
  basicData: any = {
    labels: [],
    datasets: []
  };
  basicOptions: any = {};
  private moodTimer: NodeJS.Timeout|null = null;

  ngOnInit(): void {
    this.updateChartOptions();
    this.startInterval();

  }

  ngOnDestroy() {
    if(this.moodTimer !== null){
      clearInterval(this.moodTimer);
    }
  }

  updateChartOptions() {
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }


  startInterval(){
    this.moodTimer = setInterval(() => {
      let moodValues: IMoodValue = {
        time: new Date(),
        lines: []
      };
      for (const label of Object.keys(this.moodLineValues)) {
        moodValues.lines.push({ label: label, value: this.moodLineValues[label] })
      }
      this.moodValues.push(moodValues);
      this.moodValues = this.moodValues.slice(Math.max(this.moodValues.length - 5, 0));
      this.basicData = this.buildBasicDataByMoodValues(this.moodValues);
      console.log(this.basicData)
    }, 1000);
  }

  buildBasicDataByMoodValues(moodValues: IMoodValue[]){
    let datasets: any = {};
    let data: any = {
      labels: [],
      datasets: []
    }
    for (const moodValue of moodValues) {
      data.labels.push(moment(moodValue.time).format("mm:ss"));
      for (const line of moodValue.lines) {
        if (!datasets.hasOwnProperty(line.label)) datasets[line.label] = [];
        datasets[line.label].push(line.value);
      }
    }
    for (const label of Object.keys(datasets)) {
      data.datasets.push({
        label,
        data: datasets[label],
        fill: false,
        borderColor: '#FFA726',
        tension: .4
      })
    }
    return data;
  }

}
