import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/authenticationService/authentication.service";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";
import {SessionService} from "../../../../service/sessionService/session.service";

@Component({
  selector: 'app-presenter-management',
  templateUrl: './presenter-management.component.html',
  styleUrls: ['./presenter-management.component.scss']
})
export class PresenterManagementComponent implements OnInit {

  constructor(
    private readonly router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly sessionService: SessionService,
    private readonly adminSocket: AdminSocket)
  {}

  ngOnInit(): void {
    this.connect();
  }

  connect(){
    this.authenticationService.getAdminToken().then(token => {
      this.adminSocket.connect(token.token).then(() => {
        //token muss in den global store gespeichert werden.
      });
    });
  }

  createSession(){
    this.sessionService.createSession().then(session => {
      this.router.navigate(['presenter/'+session.sessionId], { state: { sessionCode: session.sessionCode }});
    });
  }

  onCreateSession(){
    this.createSession();
  }


}
