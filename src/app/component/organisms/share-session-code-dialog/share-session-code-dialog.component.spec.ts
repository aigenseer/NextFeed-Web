import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ShareSessionCodeDialogComponent} from './share-session-code-dialog.component';

describe('ShareSessionCodeDialogComponent', () => {
  let component: ShareSessionCodeDialogComponent;
  let fixture: ComponentFixture<ShareSessionCodeDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ShareSessionCodeDialogComponent]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShareSessionCodeDialogComponent);
    component = fixture.componentInstance;
    component.sessionId = 0;
    component.visible = true;
    component.sessionCode = "code";
    spyOn(component.onHide, 'emit');
    spyOn(component, 'getShareLink');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
