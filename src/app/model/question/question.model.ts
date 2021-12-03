export class Question {
  private _id: number|null = null;
  private _participantId: number|null = null;
  private _message: string;
  private _rating: number = 0;
  private _created: number;
  private _closed: number|null = null;

  constructor(id: number | null = null, participantId: number | null = null, message: string, rating: number, created: number, closed: number | null = null) {
    this._id = id;
    this._participantId = participantId;
    this._message = message;
    this._rating = rating;
    this._created = created;
    this._closed = closed;
  }

  get id(): number | null {
    return this._id;
  }

  set id(value: number | null) {
    this._id = value;
  }

  get participantId(): number | null {
    return this._participantId;
  }

  set participantId(value: number | null) {
    this._participantId = value;
  }

  get message(): string {
    return this._message;
  }

  set message(value: string) {
    this._message = value;
  }

  get rating(): number {
    return this._rating;
  }

  set rating(value: number) {
    this._rating = value;
  }

  get created(): number {
    return this._created;
  }

  set created(value: number) {
    this._created = value;
  }

  get closed(): number | null {
    return this._closed;
  }

  set closed(value: number | null) {
    this._closed = value;
  }
}
