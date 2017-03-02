import restify from 'restify';

import Todo from '../models/todo';

const findTodoBefore = route => async (request, response, next) => {
  const todo = await Todo.findById(request.params.id);

  if (!todo) {
    next(new restify.NotFoundError('Todo not found.'));
    return;
  }

  route(request, response, todo, next);
};

export default (api) => {
  api.get('/todos', async (request, response, next) => {
    const todos = await Todo.allOrdered();

    response.send(todos);
    next();
  });

  api.post('/todos', async (request, response, next) => {
    const todo = await Todo.create(request.body);

    response.status(201);
    response.send(todo);
    next();
  });

  api.del('/todos', async (request, response, next) => {
    await Todo.destroyAll();

    const todos = await Todo.allOrdered();

    response.send(200, todos);
    next();
  });

  api.get('/todos/:id', findTodoBefore((request, response, todo, next) => {
    response.send(todo);
    next();
  }));

  api.patch('/todos/:id', findTodoBefore(async (request, response, todo, next) => {
    await todo.update(request.body);

    response.send(todo);
    next();
  }));

  api.del('/todos/:id', findTodoBefore(async (request, response, todo, next) => {
    await todo.destroy();

    response.send(204, null);
    next();
  }));
};
