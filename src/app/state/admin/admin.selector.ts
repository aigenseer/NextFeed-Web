import {createSelector} from "@ngrx/store";
import {IAppAdminState} from "./app.admin.state";
import {Token} from "../../model/token/token.model";
import {ISessionData} from "../../model/sessionCreateData/session-create-data.model";

export const selectToken = createSelector(
  (state: IAppAdminState) => state.adminToken,
  (token: Token) => token,
);

export const selectTokenCode = createSelector(
  (state: IAppAdminState) => state.adminToken,
  (token: Token) => token.token,
);

export const selectCurrentSessionData = createSelector(
  (state: IAppAdminState) => {
    return state.adminCurrentSessionData;
  },
  (sessionData: ISessionData) => sessionData
);
