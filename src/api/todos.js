var restify = require('restify');

var Todo = require('../models/todo');

var findTodoBefore = function(request, response, next) {
    var todo = Todo.findById(request.params.id);
    console.log('FIND', todo)

    if (!todo) {
        return next(new restify.NotFoundError('Todo not found.'));
    }

    request.todo = todo;

    next();
};

module.exports = function(api) {
    api.get('/todos', function(request, response, next) {
        response.send(Todo.all());
        next();
    l} );

    api.post('/todos', function(request, response, next) {
        var todo = Todo.create(request.body);

        response.status(201);
        response.send(todo);
        next();
    });

    api.del('/todos', function(request, response, next) {
        Todo.archive();

        response.send(204, null);
        next();
    });

    api.get('/todos/:id/', findTodoBefore, function(request, response, next) {
        response.send(request.todo);
        next();
    });

    api.put('/todos/:id', findTodoBefore, function(request, response, next) {
        console.log('TODO', request.todo)
        request.todo.completed = request.body.completed;

        request.todo.save();

        response.send(request.todo);
        next();
    });

    api.del('/todos/:id', findTodoBefore, function(request, response, next) {
        request.todo.delete();

        response.send(204, null);
        next();
    });
};
