import {Token} from "../../model/token/token.model";
import {CookieStore, StoreIds} from "../../lib/CookieStore";
import {createReducer, on} from "@ngrx/store";
import {
  deleteVotedQuestion,
  pushQuestionId,
  removeToken,
  setQuestionIds,
  setToken,
  votedQuestion
} from "./participant.actions";
import {IVotedQuestion} from "./app.participant.state";

export const initialTokenState: Token = CookieStore.getParsedJSONOrDefault<Token>(StoreIds.participantToken, obj => new Token(obj.token), new Token(""));
export const initialQuestionIds: number[] = CookieStore.getJSONObjectOrDefault(StoreIds.participantQuestion,  []);
export const initialVotedQuestions: IVotedQuestion[] = CookieStore.getJSONObjectOrDefault(StoreIds.participantVotedQuestions,  []);

export const participantTokenReducer = createReducer(
  initialTokenState,
  on(setToken, setTokenReducer),
  on(removeToken, setRemoveTokenReducer)
);

function setTokenReducer(state: Token, { token }: { token: Token }): Token {
  CookieStore.setObject(StoreIds.participantToken, {token: token.token});
  return token;
}

function setRemoveTokenReducer(state: Token): Token {
  return setTokenReducer(state, {token: new Token("")});
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
  let oldIds = state !== undefined? state: [];
  return setQuestionIdsReducer(state, { questionIds: [...oldIds, questionId] });
}


export const participantVotedQuestionReducer = createReducer(
  initialVotedQuestions,
  on(votedQuestion, pushVotedQuestionReducer),
  on(deleteVotedQuestion, deleteVotedQuestionReducer),
);

function pushVotedQuestionReducer(state: IVotedQuestion[], { votedQuestion }: { votedQuestion: IVotedQuestion }): IVotedQuestion[] {
  let oldIds = state !== undefined? state: [];
  let newState = [...oldIds, votedQuestion]
  CookieStore.setObject(StoreIds.participantVotedQuestions,  newState);
  return newState;
}

function deleteVotedQuestionReducer(): IVotedQuestion[] {
  return []
}





