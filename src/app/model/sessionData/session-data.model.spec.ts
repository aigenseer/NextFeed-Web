import { SessionData } from './session-data.model';
import {Question} from "../question/question.model";
import {Participant} from "../participant/participant.model";

describe('SessionData', () => {
  let question = new Question("text");
  let participant = new Participant(99, "nickname");
  let sessionData = new SessionData([question], [participant]);

  it('should create an instance', () => {
    expect(sessionData).toBeTruthy();
  });

  it('get text', () => {
    expect(question.text).toEqual("text");
  });

});
