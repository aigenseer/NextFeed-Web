import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PresenterSurveyComponent } from './presenter-survey.component';

describe('PresenterSurveyComponent', () => {
  let component: PresenterSurveyComponent;
  let fixture: ComponentFixture<PresenterSurveyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PresenterSurveyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenterSurveyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
