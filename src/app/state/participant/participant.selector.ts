import {createSelector} from "@ngrx/store";
import {IAppParticipantState} from "./app.participant.state";
import {Token} from "../../model/token/token.model";
import jwt_decode from "jwt-decode";

export const selectToken = createSelector(
  (state: IAppParticipantState) => state.participantToken,
  (token: Token) => token,
);

export const selectParticipantData = createSelector(
  (state: IAppParticipantState) => {
    return state.participantToken;
  },
  (token: Token) => {
    let payload = jwt_decode(token.token) as any;
    if(payload.hasOwnProperty("id") && payload.hasOwnProperty("username")){
      return {id: payload.id, nickname: payload.username};
    }
    return null
  },
);

export const selectQuestionIds = createSelector(
  (state: IAppParticipantState) => state.questionIds,
  (questionIds: number[]) => questionIds,
);
