import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParticipantLoginComponent } from './participant-login.component';
import {RouterTestingModule} from "@angular/router/testing";

describe('ParticipantLoginComponent', () => {
  let component: ParticipantLoginComponent;
  let fixture: ComponentFixture<ParticipantLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      declarations: [ ParticipantLoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParticipantLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
