var restify = require('restify');

var todo = {
    id:        42,
    title:     'dredd',
    completed: false
};

module.exports = function(api) {
    api.get('/todos', function(request, response, next) {
        response.send([todo]);
        next();
    });

    api.post('/todos', function(request, response, next) {
        response.status(201);
        response.send(todo);
        next();
    });

    api.del('/todos', function(request, response, next) {
        response.send(204, null);
        next();
    });

    api.get('/todos/:id/', function(request, response, next) {
        if (request.params.id != todo.id) {
            return next(new restify.NotFoundError('Todo not found.'));
        }

        response.send(todo);
        next();
    });

    api.put('/todos/:id', function(request, response, next) {
        if (request.params.id != todo.id) {
            return next(new restify.NotFoundError('Todo not found.'));
        }

        todo.completed = request.body.completed;

        response.send(todo);
        next();
    });

    api.del('/todos/:id', function(request, response, next) {
        if (request.params.id != todo.id) {
            return next(new restify.NotFoundError('Todo not found.'));
        }

        response.send(204, null);
        next();
    });
};
