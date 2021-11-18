import { ComponentFixture, TestBed } from '@angular/core/testing';


import { PresenterManagementComponent } from './presenter-management.component';
import {RouterTestingModule} from "@angular/router/testing";
import { HttpClientTestingModule } from '@angular/common/http/testing';


describe('PresenterManagementComponent', () => {
  let component: PresenterManagementComponent;
  let fixture: ComponentFixture<PresenterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule],
      declarations: [ PresenterManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PresenterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });
});
