import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export abstract class DefaultService {

  constructor(protected http: HttpClient) { }

  protected getAPIUrl(): String{
    if(!environment.production){
      return location.origin.replace("4200", "8080")+"/";
    }
    return location.origin+"/";
  }

  protected httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


}
