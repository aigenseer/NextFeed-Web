import {DefaultSocket} from "../defaultSocket/default.socket";
import {Question} from "../../model/question/question.model";
import {Injectable} from "@angular/core";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AdminSocket extends DefaultSocket {

  async connect(token: string) {
    try {
      const frame = await super.connect(token);
      return Promise.resolve(frame);
    }catch (e){
      return Promise.reject(e);
    }
  }

  addQuestion(question: Question){
    this.getStompClient().send("/admin/question/add", {}, question.text);
  }

  public onQuestion(): Observable<Question>
  {
    return this.subscribe<Question>('/admin/question')
  }

}
