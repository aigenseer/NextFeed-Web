import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";
import {AuthenticationService} from "../../../../service/authenticationService/authentication.service";
import {AdminSocket} from "../../../../socket/adminSocket/admin.socket";

@Component({
  selector: 'app-admin-management',
  templateUrl: './admin-management.component.html',
  styleUrls: ['./admin-management.component.scss']
})
export class AdminManagementComponent implements OnInit {

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
    this.router.navigate(['admin/1']);
  }


}
