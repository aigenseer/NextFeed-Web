import Cookies, {CookieAttributes} from "js-cookie";

export enum StoreIds {
  adminToken = 'adminToken',
  adminCurrentSessionData = 'adminCurrentSessionData',
  participantToken = 'participantToken',
  participantQuestion = 'participantQuestion',
}

export type ParseCallback<T> = (jsonObject: any) => T

export class CookieStore {

  static set(id: StoreIds, entry: string, options: CookieAttributes = {}){
    Cookies.set(id, entry, Object.assign({ secure: true, sameSite: 'strict'}, options));
  }

  static setObject(id: StoreIds, entryObject: any, options: CookieAttributes = {}){
    CookieStore.set(id, JSON.stringify(entryObject), options);
  }

  static get(id: StoreIds){
    let entry = Cookies.get(id);
    if(entry !== undefined){
      return entry;
    }
    return null
  }

  static getOrDefault(id: StoreIds, defaultValue: any){
    let entry = CookieStore.get(id);
    if(entry !== null){
      return entry;
    }
    return defaultValue;
  }

  static getJSONObjectOrDefault(id: StoreIds, defaultValue: any){
    let entry = CookieStore.get(id);
    if(entry !== null){
      return JSON.parse(entry);
    }
    return defaultValue;
  }

  static getParsedJSONOrDefault<T>(id: StoreIds, parseCallback: ParseCallback<T>, defaultValue: any): T
  {
    let entry = CookieStore.get(id);
    if(entry !== null){
      return parseCallback(<T>JSON.parse(entry));
    }
    return defaultValue;
  }

}
