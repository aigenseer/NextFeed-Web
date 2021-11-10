import { Question } from './question.model';

describe('Question', () => {
  let question = new Question("text");

  it('should create an instance', () => {
    expect(question).toBeTruthy();
  });

  it('get text', () => {
    expect(question.text).toEqual("text");
  });
});
