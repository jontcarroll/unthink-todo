import { ObjectID } from 'mongodb';

export class TodoSchema {
  public _id?: ObjectID;
  public title: string;
  public complete: boolean;
  public dateCreated: Date;

  constructor(init?: Partial<TodoSchema>) {
    Object.assign(this, init);
  }
}