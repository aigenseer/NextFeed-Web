import {Question} from './question.model';

describe('Question', () => {
  let question = new Question(null, null, "message", 0, new Date().getTime(), null);

  it('should create an instance', () => {
    expect(question).toBeTruthy();
  });

  it('get message', () => {
    expect(question.message).toEqual("message");
  });

});
