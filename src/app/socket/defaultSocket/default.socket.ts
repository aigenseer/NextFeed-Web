import * as SockJS from "sockjs-client";
import * as Stomp from "stompjs";
import {environment} from "../../../environments/environment";
import {Frame} from "stompjs";
import {Observable} from "rxjs";

export abstract class DefaultSocket {

  private stompClient: Stomp.Client|null = null;


  protected getEndpointUrl(): String{
    if(!environment.production){
      return location.origin.replace("4200", "8080")+"/";
    }
    return location.origin+"/";
  }

  public getStompClient(): any {
    return this.stompClient;
  }

  public connect(token: string): Promise<Frame>
  {
    return new Promise((resolve, reject) => {
      this.stompClient = Stomp.over(new SockJS(this.getEndpointUrl()+'ws'));
      this.stompClient.connect({token: token}, (frame) => {
        if(frame !== undefined){
          resolve(frame);
        }else {
          reject(new Error("Can not connect to server"));
        }
      });
    });
  }

  protected getDataByFrame<T>(res: Frame): T|null
  {
    try{
      if(res.body.trim().length > 2){
        return <T>JSON.parse(res.body);
      }
    }catch (e){
      console.warn("failed to parse body of ", res.body)
    }
    return null;
  }

  protected subscribe<T>(subscribePath: string): Observable<T>
  {
    return new Observable<T>(observer => {
      this.getStompClient().subscribe(subscribePath, (req: Frame) => {
        let data = this.getDataByFrame<T>(req);
        if(data !== null) observer.next(data);
      });
    });
  }

}
