export class Participant {
  private readonly _id: number;
  private readonly _nickname: string;

  constructor(id: number, nickname: string) {
    this._id = id;
    this._nickname = nickname;
  }

  get id(): number {
    return this._id;
  }


  get nickname(): string {
    return this._nickname;
  }


}
