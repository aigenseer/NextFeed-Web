export class Question {
  public id: number|null = null;
  public participantId: number|null = null;
  public message: string;
  public rating: number = 0;
  public created: number;
  public closed: number|null = null;

  constructor(id: number | null = null, participantId: number | null = null, message: string, rating: number, created: number, closed: number | null = null) {
    this.id = id;
    this.participantId = participantId;
    this.message = message;
    this.rating = rating;
    this.created = created;
    this.closed = closed;
  }


}
