import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/authenticationService/authentication.service";
import {SessionService} from "../../../../service/sessionService/session.service";
import {selectCurrentSessionData} from "../../../../state/admin/admin.selector";
import {select, Store} from "@ngrx/store";
import {IAppAdminState} from "../../../../state/admin/app.admin.state";
import {setCurrentDataSession} from "../../../../state/admin/admin.actions";
import {firstValueFrom, Observable} from "rxjs";
import {Token} from "../../../../model/token/token.model";
import {take} from "rxjs/operators";
import {defaultSessionData} from "../../../../state/admin/admin.token.reducer";
import {ISessionData} from "../../../../model/sessionCreateData/session-create-data.model";
import {SessionMetadata} from "../../../../model/sessionMetadata/session-metadata.model";
import {WaitDialogService} from "../../../../service/waitDialogService/wait-dialog.service";
import {selectToken} from "../../../../state/token/token.selector";
import {setToken} from "../../../../state/token/token.actions";
import {CustomRouterService} from "../../../../service/customRouter/custom-router.service";
import {AcceptDialogService} from "../../../../service/acceptDialogService/accept-dialog.service";
import {PresenterSessionSocket} from "../../../../socket/presenter/sessionSocket/presenter.session.socket";

@Component({
  selector: 'app-presenter-management',
  templateUrl: './presenter-management.component.html',
  styleUrls: ['./presenter-management.component.scss']
})
export class PresenterManagementComponent implements OnInit{

  private token: string = "";
  sessionsMetadata: SessionMetadata[] = [];
  openNewSessionDialog: boolean = false;

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly sessionService: SessionService,
    // private readonly adminSocket: AdminSocket,
    private readonly sessionSocket: PresenterSessionSocket,
    private readonly store: Store<IAppAdminState>,
    private readonly waitDialogService: WaitDialogService,
    private readonly customRouterService: CustomRouterService,
    private readonly acceptDialogService: AcceptDialogService,
  ) {}

  ngOnInit(): void {
    this.observerToken().subscribe(token => {
      // this.loadPageData();
      this.connectToEndpoints(token);
    });
  }

  updateToken(): Promise<string>
  {
    return new Promise((resolve, reject) => {
      this.authenticationService.getPresenterToken().then((token: Token) => {
        this.store.dispatch(setToken({token: token.token}));
        resolve(token.token);
      }).catch(reject);
    });
  }

  observerToken(){
    return new Observable<string>(observer => {
      this.store.select(selectToken).subscribe(token => {
        if(token.length === 0){
          this.updateToken().then(t => observer.next(t));
        }else{
          observer.next(token);
        }
      });
    });
  }

  connectToEndpoints(token: string){
    this.token = token;
    this.sessionSocket.disconnect();
    this.waitDialogService.open("Wait for connection");
    this.sessionSocket.connect(token, false).subscribe((next) => {
      if(next instanceof Error){
        this.waitDialogService.open("Connection lost");
      }else {
        //connect to endpoints
        this.loadPageData();
        this.waitDialogService.close();
        this.existsCurrentSession().then(([exists, sessionData]) => {
          if(exists){
            this.navigateToSession(sessionData);
          }
        });
      }
    });
  }

  existsCurrentSession(): Promise<[Boolean, ISessionData]>
  {
    return new Promise((resolve, reject) => {
      firstValueFrom(this.store.pipe(select(selectCurrentSessionData), take(1))).then(sessionData => {
        resolve([sessionData.id !== defaultSessionData.id, sessionData]);
      });
    });
  }

  loadPageData(){
    this.sessionService.getSessionsMetadata().then((sessionsMetadata) => this.sessionsMetadata = sessionsMetadata)
  }

  createSession(name: string){
    this.sessionService.createSession(name).then(sessionData => {
      this.store.dispatch(setCurrentDataSession({sessionData}));
      this.navigateToSession(sessionData);
    });
  }

  navigateToSession(sessionData: ISessionData){
    this.customRouterService.navigateWithObserverQueryParams([['presenter', sessionData.id].join('/')]);
  }

  onCreateSession(){
    this.openCreateSessionDialog();
  }

  onClosedCreateSessionDialog(name: string) {
    if(name.length > 0){
      this.createSession(name);
    }
  }

  openCreateSessionDialog(){
    this.openNewSessionDialog = true;
  }

  onSelectSessionMetadata(sessionMetadata: SessionMetadata) {
    this.customRouterService.navigateWithObserverQueryParams([['presenter', sessionMetadata.sessionId, 'data'].join('/')]);
  }

}
