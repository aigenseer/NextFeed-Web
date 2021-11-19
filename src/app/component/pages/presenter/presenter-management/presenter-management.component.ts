import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/authenticationService/authentication.service";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";
import {SessionService} from "../../../../service/sessionService/session.service";
import {selectCurrentSessionData, selectToken} from "../../../../state/admin/admin.selector";
import {select, Store} from "@ngrx/store";
import {IAppAdminState} from "../../../../state/admin/app.admin.state";
import {setCurrentDataSession, setToken} from "../../../../state/admin/admin.actions";
import {firstValueFrom, Observable} from "rxjs";
import {Token} from "../../../../model/token/token.model";
import {take} from "rxjs/operators";
import {defaultSessionData} from "../../../../state/admin/admin.token.reducer";
import {ISessionData} from "../../../../model/sessionCreateData/session-create-data.model";

@Component({
  selector: 'app-presenter-management',
  templateUrl: './presenter-management.component.html',
  styleUrls: ['./presenter-management.component.scss']
})
export class PresenterManagementComponent implements OnInit {

  private token: string = "";

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly sessionService: SessionService,
    private readonly adminSocket: AdminSocket,
    private readonly store: Store<IAppAdminState>
  )
  {}

  ngOnInit(): void {
    this.observerToken().subscribe(token => {
      this.connectToEndpoints(token);
    });
  }

  updateToken(){
    this.authenticationService.getAdminToken().then(token => {
      this.store.dispatch(setToken({token}));
    });
  }

  observerToken(){
    return new Observable<Token>(observer => {
      this.store.select(selectToken).subscribe(token => {
        if(token.token.length === 0){
          this.updateToken();
        }else{
          observer.next(token);
        }
      });
    });
  }

  connectToEndpoints(token: Token){
    this.token = token.token;
    this.adminSocket.disconnect();
    this.adminSocket.connect(token.token).then(() => {
      //connect to endpoints
      this.existsCurrentSession().then(([exists, sessionData]) => {
        if(exists){
          this.navigateToSession(sessionData);
        }
      });

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

  createSession(){
    this.sessionService.createSession(this.token).then(sessionData => {
      this.store.dispatch(setCurrentDataSession({sessionData}));
      this.navigateToSession(sessionData);
    });
  }

  navigateToSession(sessionData: ISessionData){
    this.router.navigate(['presenter/'+sessionData.id]);
  }

  onCreateSession(){
    this.createSession();
  }


}
