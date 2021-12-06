import {Token} from "../../model/token/token.model";
import {ISessionData} from "../../model/sessionCreateData/session-create-data.model";

export interface IAppAdminState{
  adminToken: Token,
  adminCurrentSessionData: ISessionData
}
