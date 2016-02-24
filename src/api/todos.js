var restify = require('restify');

var Todo = require('../models/todo');

var findTodoBefore = function(request, response, next) {
    return Todo.findById(request.params.id).then(function(todo) {
        if (!todo) {
            return next(new restify.NotFoundError('Todo not found.'));
        }

        request.todo = todo;

        next();
    });
};

module.exports = function(api) {
    api.get('/todos', function(request, response, next) {
        return Todo.allOrdered().then(function(todos) {
            response.send(todos);
            next();
        });
    });

    api.post('/todos', function(request, response, next) {
        return Todo.create(request.body).then(function(todo) {
            response.status(201);
            response.send(todo);
            next();
        });
    });

    api.del('/todos', function(request, response, next) {
        return Todo.archiveCompleted().then(function() {
            response.send(200, []);
            next();
        });
    });

    api.get('/todos/:id/', findTodoBefore, function(request, response, next) {
        response.send(request.todo);
        next();
    });

    api.patch('/todos/:id', findTodoBefore, function(request, response, next) {
        console.log(request.body, request.todo.toJSON());
        return request.todo.update(request.body).then(function() {
            response.send(this);
            next();
        });
    });

    api.del('/todos/:id', findTodoBefore, function(request, response, next) {
        return request.todo.destroy().then(function() {
            response.send(204, null);
            next();
        });
    });
};
