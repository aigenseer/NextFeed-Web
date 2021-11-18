export class SessionCreateData {
  private readonly _sessionId: number
  private readonly _sessionCode: string

  constructor(sessionId: number, sessionCode: string) {
    this._sessionId = sessionId;
    this._sessionCode = sessionCode;
  }

  get sessionId(): number {
    return this._sessionId;
  }

  get sessionCode(): string {
    return this._sessionCode;
  }
}
