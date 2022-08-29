import {Question} from "../../../model/question/question.model";
import {Injectable} from "@angular/core";
import {map, Observable} from "rxjs";
import {Participant} from "../../../model/participant/participant.model";
import {Survey} from "../../../model/survey/survey.model";
import {DefaultSocket} from "../../defaultSocket/default.socket";

@Injectable({
  providedIn: 'root'
})
export class ParticipantQuestionSocket extends DefaultSocket {

  constructor() {
    super("/socket/question-socket");
  }

  public voteQuestionId(sessionId: number, questionId: number, vote: boolean){
    let path = vote ? `${this.getEndpointPrefix()}/v1/participant/session/${sessionId}/question/${questionId}/rating/up`: `${this.getEndpointPrefix()}/v1/participant/session/${sessionId}/question/${questionId}/rating/down`
    this.getStompClient().send(path, {});
  }

  public onUpdateQuestion(sessionId: number): Observable<Question>
  {
    return this.subscribe<Question>(`${this.getEndpointPrefix()}/v1/presenter/session/${sessionId}/question/onupdate`).pipe(
      map((data: Question) =>
        new Question(
          data.id,
          new Participant(data.participant.id, data.participant.nickname, data.participant.connected),
          data.message,
          data.rating,
          data.created,
          data.closed
        ))
    );
  }

}
