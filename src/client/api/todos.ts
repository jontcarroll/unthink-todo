import { TodoModel } from '../../server/models/todo-model';

export async function getTodos(): Promise<TodoModel> {
  const response = await window.fetch(
    'api/todo',
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.ok) {
    return (await response.json()).map((data: Record<string, unknown>) => new TodoModel(data));
  } else {
    throw new Error('Unknown error has occured');
  }
}

export async function addTodo(model: TodoModel): Promise<void> {
  const response = await window.fetch(
    '/api/todo',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }
  );

  if (response.ok) {
    return;
  } else {
    throw new Error('Unknown error has occured');
  }
}

export async function updateTodo(model: TodoModel): Promise<void> {
  const response = await window.fetch(
    '/api/todo',
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(model)
    }
  );

  if (response.ok) {
    return;
  } else {
    throw new Error('Unknown error has occured');
  }
}

export async function deleteTodo(id: string): Promise<void> {
  const response = await window.fetch(
    `api/todo/${id}`,
    {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    }
  );

  if (response.ok) {
    return;
  } else {
    throw new Error('Unknown error has occurred');
  }
}