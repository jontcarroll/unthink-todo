import { ResourceBase } from './resource-base';
import { resource, get, template, TemplateResponse, RedirectResponse, ApiResponse, CookieResponse, put, post, ResourceNotFound, body, path, del } from 'resource-decorator';
import { TodoSchema } from '../schemas/todo-schema';
import { TodoModel } from '../models/todo-model';
import { ObjectID } from 'mongodb';

@resource({
  basePath: '',
})
export class TodoResource extends ResourceBase {
  @template()
  async indexPage(): Promise<TemplateResponse | RedirectResponse> {
    return new TemplateResponse('todo.html');
  }

  @get({
    path: '/api/todo'
  })
  async getTodos(): Promise<ApiResponse | CookieResponse | void> {
    const db = await this.mongoDbService.getDb();
    const coll = db.collection<TodoSchema>('todos');

    const todos = await coll.find().toArray();

    if (!todos) {
      throw new ResourceNotFound();
    }

    return new ApiResponse(todos.map(t => {
      return new TodoModel({
        id: t._id?.toHexString(),
        title: t.title,
        complete: t.complete,
        dateCreated: t.dateCreated
      })
    }));
  }

  @post({
    path: '/api/todo'
  })
  async postTodo(@body() model: TodoModel): Promise<ApiResponse | CookieResponse | void> {
    const db = await this.mongoDbService.getDb();
    const coll = db.collection<TodoSchema>('todos');

    const schema = new TodoSchema({
      title: model.title,
      complete: model.complete,
      dateCreated: new Date()
    });

    const resp = await coll.insertOne(schema);

    if (!resp.result.ok) {
      throw new Error('Failed to insert todo item');
    }
    return new ApiResponse({});
  }

  @put({
    path: '/api/todo'
  })
  async putTodo(@body() model: TodoModel): Promise<ApiResponse | CookieResponse | void> {
    const db = await this.mongoDbService.getDb();
    const coll = db.collection<TodoSchema>('todos');

    const record = await coll.findOne({ _id: new ObjectID(model.id) });

    if (!record) {
      throw new ResourceNotFound();
    }

    const updateResp = await coll.updateOne(
      { _id: new ObjectID(model.id) },
      { $set: {
        title: model.title,
        complete: model.complete }
      });

    if (!updateResp.result.ok) {
      throw new Error('Failed to update todo item');
    }

    return new ApiResponse({});
  }

  @del({
    path: '/api/todo/:id'
  })
  async deleteTodo(@path('id') id: string): Promise<ApiResponse | CookieResponse | void> {
    const db = await this.mongoDbService.getDb();
    const coll = db.collection<TodoSchema>('todos');

    const record = await coll.findOne({ _id: new ObjectID(id)});

    if (!record) {
      throw new ResourceNotFound();
    }

    const delResp = await coll.deleteOne({ _id: new ObjectID(id) });

    if (!delResp.result.ok) {
      throw new Error('Failed to delete todo item!');
    }

    return new ApiResponse({});
  }
}
