import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSessionComponent } from './admin-session.component';
import {RouterTestingModule} from "@angular/router/testing";
import {MessageService} from "primeng/api";
import {HttpClientTestingModule} from "@angular/common/http/testing";

describe('AdminSessionComponent', () => {
  let component: AdminSessionComponent;
  let fixture: ComponentFixture<AdminSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      providers:[MessageService],
      declarations: [ AdminSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
