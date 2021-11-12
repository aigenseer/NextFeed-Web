import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantSessionComponent } from './paricipant-session.component';

describe('ParicipantSessionComponent', () => {
  let component: ParticipantSessionComponent;
  let fixture: ComponentFixture<ParticipantSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParticipantSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
