var _      = require('lodash');
var config = require('config');

var todos = {};

var Todo = function(data) {
    this.title     = data.title;

    this.completed = false;
};

Todo.prototype.delete = function() {
    delete todos[this.id];
};

Todo.prototype.save = function() {
    if (!this.id) {
        var lastTodo = _.last(todos);
        this.id      = lastTodo ? (lastTodo.id + 1) : 1;
    }

    this.url = config.get('server.api_root') + '/todos/' + this.id;

    todos[this.id] = this;
};

Todo.all = function() {
    return _.values(todos);;
};

Todo.archive = function() {
    _.reject(todos, function(todo) { return todo.completed; });
};

Todo.create = function(data) {
    var todo = new Todo(data);

    todo.save();

    return todo;
};

Todo.findById = function(id) {
    return todos[id];
};

module.exports = Todo;
