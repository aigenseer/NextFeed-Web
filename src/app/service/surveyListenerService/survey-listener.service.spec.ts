import { TestBed } from '@angular/core/testing';

import { SurveyListenerService } from './survey-listener.service';

describe('SurveyListenerService', () => {
  let service: SurveyListenerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SurveyListenerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
