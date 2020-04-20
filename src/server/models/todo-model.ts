export class TodoModel {
  public id: string;
  public title: string;
  public complete: boolean = false;
  public dateCreated: Date;

  constructor(init?: Partial<TodoModel>) {
    Object.assign(this, init);
  }
}