import {Token} from "../../model/token/token.model";

export interface IAppParticipantState{
  participantToken: Token,
  questionIds: number[]
}
