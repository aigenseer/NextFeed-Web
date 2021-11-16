import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/authenticationService/authentication.service";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";

@Component({
  selector: 'app-presenter-management',
  templateUrl: './presenter-management.component.html',
  styleUrls: ['./presenter-management.component.scss']
})
export class PresenterManagementComponent implements OnInit {

  constructor(
    private router: Router,
    private readonly authenticationService: AuthenticationService,
    private readonly adminSocket: AdminSocket)
  {}

  ngOnInit(): void {
    this.connect();
  }

  connect(){
    this.authenticationService.getAdminToken().subscribe(token => {
      this.adminSocket.connect(token.token).then(() => {
        //token muss in den global store gespeichert werden.
      });
    });
  }

  onCreateSession(){
    this.router.navigate(['presenter/1']);
  }


}
