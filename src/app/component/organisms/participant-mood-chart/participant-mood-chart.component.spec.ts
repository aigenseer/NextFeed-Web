import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantMoodChartComponent } from './participant-mood-chart.component';

describe('ParticipantMoodChartComponent', () => {
  let component: ParticipantMoodChartComponent;
  let fixture: ComponentFixture<ParticipantMoodChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantMoodChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantMoodChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
