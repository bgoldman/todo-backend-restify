import restify from 'restify';

import Todo from '../models/todo';

const findTodoBefore = (request, response, next) => {
    return Todo.findById(request.params.id).then((todo) => {
        if (!todo) {
            return next(new restify.NotFoundError('Todo not found.'));
        }

        request.todo = todo;

        next();
    });
};

export default (api) => {
    api.get('/todos', (request, response, next) => {
        return Todo.allOrdered().then((todos) => {
            response.send(todos);
            next();
        });
    });

    api.post('/todos', (request, response, next) => {
        return Todo.create(request.body).then((todo) => {
            response.status(201);
            response.send(todo);
            next();
        });
    });

    api.del('/todos', (request, response, next) => {
        return Todo.archiveCompleted().then(() => {
            response.send(200, []);
            next();
        });
    });

    api.get('/todos/:id/', findTodoBefore, (request, response, next) => {
        response.send(request.todo);
        next();
    });

    api.patch('/todos/:id', findTodoBefore, (request, response, next) => {
        const {body, todo} = request;

        return todo.update(body).then(() => {
            response.send(this);
            next();
        });
    });

    api.del('/todos/:id', findTodoBefore, (request, response, next) => {
        return request.todo.destroy().then(() => {
            response.send(204, null);
            next();
        });
    });
};
