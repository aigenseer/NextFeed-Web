import {Token} from "../../model/token/token.model";

export interface IVotedQuestion{
  questionId: number
  vote: boolean
}

export interface IAppParticipantState{
  participantToken: Token,
  participantQuestionIds: number[]
  participantVotedQuestions: IVotedQuestion[]
}
