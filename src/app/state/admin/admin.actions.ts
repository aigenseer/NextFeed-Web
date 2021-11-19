import {createAction, props} from "@ngrx/store";
import {Token} from "../../model/token/token.model";
import {ISessionData} from "../../model/sessionCreateData/session-create-data.model";

export enum ActionDescription {
  SetToken = '[Token] set token',
  SetCurrentDataSession = '[Session] set current session',
  RemoveCurrentDataSession = '[Session] remove current session',
}

export const setToken = createAction(
  ActionDescription.SetToken,
  props<{ token: Token }>(),
);

export const setCurrentDataSession = createAction(
  ActionDescription.SetCurrentDataSession,
  props<{ sessionData: ISessionData }>(),
);

export const removeCurrentDataSession = createAction(
  ActionDescription.RemoveCurrentDataSession
);

