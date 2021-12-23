export class User {
  private readonly _id: string;
  private readonly email: string;
  private readonly points: number;

  constructor(_id: string, email: string, points: number) {
    this._id = _id;
    this.email = email;
    this.points = points;
  }

}
