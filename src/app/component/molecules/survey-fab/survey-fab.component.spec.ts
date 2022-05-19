import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SurveyFabComponent } from './survey-fab.component';

describe('SurveyFabComponent', () => {
  let component: SurveyFabComponent;
  let fixture: ComponentFixture<SurveyFabComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SurveyFabComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SurveyFabComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
