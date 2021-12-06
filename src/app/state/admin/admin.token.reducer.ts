import {createReducer, on} from "@ngrx/store";
import {Token} from "../../model/token/token.model";
import {removeCurrentDataSession, setCurrentDataSession, setToken} from "./admin.actions";
import {ISessionData} from "../../model/sessionCreateData/session-create-data.model";
import {CookieStore, StoreIds} from "../../lib/CookieStore";
import jwt_decode from "jwt-decode";
import {CookieAttributes} from "js-cookie";

export const defaultSessionData: ISessionData = {
  id: 0,
  sessionCode: ""
}
export const initialTokenState: Token = CookieStore.getParsedJSONOrDefault<Token>(StoreIds.adminToken, obj => new Token(obj.token), new Token(""));
export const initialSessionData: ISessionData = CookieStore.getJSONObjectOrDefault(StoreIds.adminCurrentSessionData,  defaultSessionData);

export const adminTokenReducer = createReducer(
  initialTokenState,
  on(setToken, setTokenReducer)
);

export const adminCurrentSessionReducer = createReducer(
  initialSessionData,
  on(setCurrentDataSession, setCurrentSessionDataReducer),
  on(removeCurrentDataSession, removeCurrentDataSessionReducer)
);

function setTokenReducer(state: Token, { token }: { token: Token }): Token {
  let options: CookieAttributes = {}
  let payload = jwt_decode(token.token) as any;
  if(payload.hasOwnProperty("expirationDate")){
    options.expires = new Date(parseInt(payload?.expirationDate));
  }
  CookieStore.setObject(StoreIds.adminToken, {token: token.token}, options);
  return token;
}

function setCurrentSessionDataReducer(state: ISessionData, { sessionData }: { sessionData: ISessionData }): ISessionData {
  CookieStore.setObject(StoreIds.adminCurrentSessionData, {id: sessionData.id, sessionCode: sessionData.sessionCode});
  return sessionData;
}

function removeCurrentDataSessionReducer(state: ISessionData): ISessionData {
  return setCurrentSessionDataReducer(state, {sessionData: defaultSessionData})
}

