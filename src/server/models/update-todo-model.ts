export class TodoModel {
  public title: string;
  public complete: boolean;

  constructor(init?: Partial<TodoModel>) {
    Object.assign(this, init);
  }
}