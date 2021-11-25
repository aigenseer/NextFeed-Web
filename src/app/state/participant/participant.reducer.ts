import {Token} from "../../model/token/token.model";
import {CookieStore, StoreIds} from "../../lib/CookieStore";
import {createReducer, on} from "@ngrx/store";
import {pushQuestionId, setQuestionIds, setToken} from "./participant.actions";

export const initialTokenState: Token = CookieStore.getParsedJSONOrDefault<Token>(StoreIds.participantToken, obj => new Token(obj.token), new Token(""));
export const initialQuestionIds: number[] = CookieStore.getJSONObjectOrDefault(StoreIds.participantQuestion,  []);

export const participantTokenReducer = createReducer(
  initialTokenState,
  on(setToken, setTokenReducer)
);

function setTokenReducer(state: Token, { token }: { token: Token }): Token {
  CookieStore.setObject(StoreIds.adminToken, {token: token.token});
  return token;
}

export const participantQuestionReducer = createReducer(
  initialQuestionIds,
  on(setQuestionIds, setQuestionIdsReducer),
  on(pushQuestionId, pushQuestionIdReducer),
);

function setQuestionIdsReducer(state: number[], { questionIds }: { questionIds: number[] }): number[] {
  CookieStore.setObject(StoreIds.participantQuestion, questionIds);
  return questionIds;
}

function pushQuestionIdReducer(state: number[], { questionId }: { questionId: number }): number[] {
  return setQuestionIdsReducer(state, { questionIds: [...state, questionId] });
}
