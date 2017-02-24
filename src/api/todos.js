import restify from 'restify';

import Todo from '../models/todo';

const findTodoBefore = async (request, response, next) => {
    const todo = await Todo.findById(request.params.id);

    if (!todo) {
        next(new restify.NotFoundError('Todo not found.'));
    }

    request.todo = todo;

    next();
};

export default api => {
    api.get('/todos', async (request, response) => {
        const todos = await Todo.allOrdered();

        response.send(todos);
    });

    api.post('/todos', async (request, response) => {
        const todo = await Todo.create(request.body);

        response.status(201);
        response.send(todo);
    });

    api.del('/todos', async (request, response) => {
        await Todo.archiveCompleted();

        response.send(200, []);
    });

    api.get('/todos/:id', findTodoBefore, (request, response) => {
        response.send(request.todo);
    });

    api.patch('/todos/:id', findTodoBefore, async (request, response) => {
        await request.todo.update(request.body);

        response.send(request.todo);
    });

    api.del('/todos/:id', findTodoBefore, async (request, response) => {
        await request.todo.destroy();

        response.send(204, null);
    });
};
