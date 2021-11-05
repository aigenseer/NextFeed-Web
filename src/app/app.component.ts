import {Component, OnInit} from '@angular/core';
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'lecturefeed-ui';

  private stompClient: any = null;

  ngOnInit(): void {
    this.connect();
  }

  public connect() {
    const socket = new SockJS('http://localhost:8080/ws');
    this.stompClient = Stomp.over(socket);


    this.stompClient.connect({}, (frame: any) => {
      console.log('Connected: ' + frame);

      this.stompClient.subscribe('/admin/msg', function (msg: string) {
        console.log("msg:", msg)
      });

      setTimeout(() => {
        this.call()
        setInterval(() =>  this.call(), 3000);
      }, 2000);

    });
  }

  call(){
    this.stompClient.send('/admin/msg',{}, JSON.stringify({name: "testname"}));
  }


}
