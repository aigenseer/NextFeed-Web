import {ComponentFixture, TestBed} from '@angular/core/testing';

import {PresenterSessionComponent} from './presenter-session.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('PresenterSessionComponent', () => {
  let component: PresenterSessionComponent;
  let fixture: ComponentFixture<PresenterSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[MessageService],
      declarations: [ PresenterSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenterSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
