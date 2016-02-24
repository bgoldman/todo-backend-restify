import _       from 'lodash';
import config  from 'config';
import hooks   from 'hooks';
import request from 'superagent';

import Todo from '../../src/models/todo';

var currentTodo = null;
var defaultTodo = Todo.build({id: 1, title: 'default'})
var fakeTodo    = Todo.build({id: 'fake', title: 'fake'});

var localApiRoot     = config.get('server.api_root');
var hardcodedApiRoot = 'http://todo-backend-restify.heroku.com';

// replace all server URLs with the URLs of this computer before validating
hooks.beforeEachValidation(function(transaction) {
    transaction.real.body = transaction.real.body
                               .split(localApiRoot)
                               .join(hardcodedApiRoot);
});

// get the first todo ID to be used for other tests
hooks.beforeValidation('Todos > Todo Collection > Create a Todo', function(transaction) {
    currentTodo = Todo.build(JSON.parse(transaction.real.body));
});

// recreate currentTodo and reset the ID after deleting all todos
hooks.after('Todos > Todo Collection > Delete All Todos', function(transaction, done) {
    var todo = {
        title:     currentTodo.title,
        completed: currentTodo.completed,
        order:     currentTodo.order
    };

    var url = localApiRoot + Todo.basePath;

    request
        .post(url)
        .send(todo)
        .end(function(error, response) {
            if (error) {
                transaction.fail = error.message;

                return done();
            }

            currentTodo = response.body;

            done();
        });
});

// set request URLs to the current ID before any entity requests
hooks.beforeEach(function(transaction) {
    var defaultTodoPath = defaultTodo.url.replace(localApiRoot, '');

    // only do this for requests on individual entities
    if (transaction.request.uri != defaultTodoPath) {
        return;
    }

    var todo = currentTodo;

    var body = JSON.parse(transaction.request.body || '{}');

    // this functionality is not currently being used until Aglio/API Blueprint
    // implements Dredd's Request Edge Case functionality
    if (body.edge_case == 'notfound') {
        todo = fakeTodo;
    }

    var currentTodoUrlPath = todo.url.replace(localApiRoot, '');

    transaction.id = transaction.id
                         .replace(defaultTodoPath, currentTodoUrlPath);

    transaction.fullPath = transaction.request.uri
                               .replace(defaultTodoPath, currentTodoUrlPath);

    return transaction;
})

// set URLs and assignments from default to current before validating responses
hooks.beforeEachValidation(function(transaction) {
    // occasionally there isn't a current todo, so we skip this
    if (!currentTodo) {
        return;
    }

    var currentIdAssignment = '"id":' + currentTodo.id;
    var defaultIdAssignment = '"id":1';

    transaction.real.body = transaction.real.body
                                .split(currentTodo.url)
                                .join(defaultTodo.url)
                                .split(currentIdAssignment)
                                .join(defaultIdAssignment);
});
