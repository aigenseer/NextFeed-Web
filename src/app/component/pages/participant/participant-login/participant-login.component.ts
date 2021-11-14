import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-participant-login',
  templateUrl: './participant-login.component.html',
  styleUrls: ['./participant-login.component.scss']
})
export class ParticipantLoginComponent implements OnInit {

  constructor(
    private router: Router) { }

  ngOnInit(): void {
    this.connect();
  }

  connect(){
    //token muss in den global store gespeichert werden.
  }

  onSubmit(){
    this.router.navigate(['participant/1'], {state: { newSession: true }});
  }

}
