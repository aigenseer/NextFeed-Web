import {Injectable} from '@angular/core';
import {DefaultService} from "../defaultService/default.service";
import {Token} from "../../model/token/token.model";
import {firstValueFrom} from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AuthenticationService extends DefaultService{

  getAdminToken(){
    return firstValueFrom(this.http.get<Token>(this.getAPIUrl()+"auth/admin"));
  }

}
