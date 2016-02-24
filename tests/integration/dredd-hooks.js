import _       from 'lodash';
import config  from 'config';
import hooks   from 'hooks';
import request from 'superagent';

import Todo from '../../src/models/todo';

let   currentTodo = null;
const defaultTodo = Todo.build({id: 1, title: 'default'})
const fakeTodo    = Todo.build({id: 'fake', title: 'fake'});

const localApiRoot     = config.get('server.api_root');
const hardcodedApiRoot = 'http://todo-backend-restify.heroku.com';

// replace all server URLs with the URLs of this computer before validating
hooks.beforeEachValidation((transaction) => {
    transaction.real.body = transaction.real.body
                               .split(localApiRoot)
                               .join(hardcodedApiRoot);
});

// get the first todo ID to be used for other tests
hooks.beforeValidation(
    'Todos > Todo Collection > Create a Todo',
    transaction => {
        currentTodo = Todo.build(JSON.parse(transaction.real.body));
    }
);

// recreate currentTodo and reset the ID after deleting all todos
hooks.after(
    'Todos > Todo Collection > Delete All Todos',
    (transaction, done) => {
        const {title, completed, order} = currentTodo;

        const todo = {title, completed, order};

        const url = localApiRoot + Todo.basePath;

        request
            .post(url)
            .send(todo)
            .end((error, response) => {
                if (error) {
                    transaction.fail = error.message;

                    return done();
                }

                currentTodo = response.body;

                done();
            });
    }
);

// set request URLs to the current ID before any entity requests
hooks.beforeEach((transaction) => {
    const defaultTodoPath = defaultTodo.url.replace(localApiRoot, '');

    // only do this for requests on individual entities
    if (transaction.request.uri != defaultTodoPath) {
        return;
    }

    let todo   = currentTodo;
    const body = JSON.parse(transaction.request.body || '{}');

    // this functionality is not currently being used until Aglio/API Blueprint
    // implements Dredd's Request Edge Case functionality
    if (body.edge_case == 'notfound') {
        todo = fakeTodo;
    }

    const currentTodoUrlPath = todo.url.replace(localApiRoot, '');

    transaction.id = transaction.id
                         .replace(defaultTodoPath, currentTodoUrlPath);

    transaction.fullPath = transaction.request.uri
                               .replace(defaultTodoPath, currentTodoUrlPath);

    return transaction;
})

// set URLs and assignments from default to current before validating responses
hooks.beforeEachValidation((transaction) => {
    // occasionally there isn't a current todo, so we skip this
    if (!currentTodo) {
        return;
    }

    const currentIdAssignment = '"id":' + currentTodo.id;
    const defaultIdAssignment = '"id":1';

    transaction.real.body = transaction.real.body
                                .split(currentTodo.url)
                                .join(defaultTodo.url)
                                .split(currentIdAssignment)
                                .join(defaultIdAssignment);
});
