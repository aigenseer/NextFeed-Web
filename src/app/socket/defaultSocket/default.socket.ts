import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {environment} from "../../../environments/environment";
import {Frame} from "stompjs";
import {Observable, Subscriber} from "rxjs";

export abstract class DefaultSocket {

  private stompClient: Stomp.Client|null = null;
  private observersWaitForConnection: Subscriber<Frame|Error>[] = []

  protected getEndpointUrl(): String{
    if(!environment.production){
      return location.origin.replace("4200", "8080")+"/";
    }
    return location.origin+"/";
  }

  public getStompClient(): any {
    return this.stompClient;
  }

  public connect(token: string, autoReconnect: boolean = true): Observable<Frame|Error>
  {
    return new Observable<Frame|Error>(observer => {
      this.stompClientConnect(observer, token, autoReconnect);
    });
  }

  public waitForConnection(): Observable<Frame|Error>
  {
    return new Observable<Frame|Error>(observer => {
      this.observersWaitForConnection.push(observer);
    });
  }

  private stompClientConnect(observer: any, token: string, autoReconnect: boolean = true){
    this.stompClient = Stomp.over(new SockJS(this.getEndpointUrl()+'ws'));
    this.stompClient.connect({token}, (frame) => {
      if(frame !== undefined){
        observer.next(frame);
        this.observersWaitForConnection.map(o => o.next(frame));
      }else {
        let error = new Error("Can not connect to server");
        observer.next(error);
        this.observersWaitForConnection.map(o => o.next(error));
      }
    }, (msg) =>{
      let error = new Error("Connection lost");
      observer.next(error);
      this.observersWaitForConnection.map(o => o.next(error));
      if(autoReconnect){
        setTimeout(() =>{
          this.stompClientConnect(observer, token, autoReconnect);
        }, 3000);
      }
    });
  }

  public disconnect(){
    this.stompClient?.disconnect(() => {});
  }

  protected getDataByFrame<T>(res: Frame): T|null
  {
    try{
      if(res.body.trim().length > 2){
        return <T>JSON.parse(res.body);
      }
    }catch (e){
      console.warn("failed to parse body of ", res.body)
      throw Error("failed to parse body of ");
    }
    return null;
  }

  protected subscribe<T>(subscribePath: string): Observable<T>
  {
    return new Observable<T>(observer => {
      this.getStompClient().subscribe(subscribePath, (req: Frame) => {
        try {
          let data = this.getDataByFrame<T>(req);
          observer.next(data as T);
        }catch (e){}
      });
    });
  }

}
