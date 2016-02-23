var _      = require('lodash');
var config = require('config');

var Store = {
    lastId: 0,
    todos:  {}
};

var Todo = function(data) {
    if (!data) data = {};

    this.title     = data.title;
    this.completed = false;
    this.order     = data.order || 1;
};

Todo.basePath = '/todos';

Todo.prototype.delete = function() {
    delete Store.todos[this.id];
};

Todo.prototype.save = function(data) {
    if (!this.id) this.id = ++Store.lastId;

    if (!_.isEmpty(data)) {
        _.each(['title', 'completed', 'order'], (function(field) {
            if (typeof data[field] != 'undefined') this[field] = data[field];
        }).bind(this));
    }

    this.url = Todo.url(this.id);

    Store.todos[this.id] = this;
};

Todo.all = function() {
    return _.values(Store.todos);;
};

Todo.archive = function() {
    _.reject(Store.todos, function(todo) { return todo.completed; });
};

Todo.build = function(data) {
    if (!data) data = {};

    var todo = new this(data);

    if (data.id) todo.id = data.id;

    if (todo.id) todo.url = Todo.url(todo.id);

    return todo;
};

Todo.create = function(data) {
    var todo = new Todo(data);

    todo.save();

    return todo;
};

Todo.deleteAll = function() {
    Store.todos = {};
};

Todo.findById = function(id) {
    return Store.todos[id];
};

Todo.url = function(id) {
    return config.get('server.api_root') + this.urlPath(id);
};

Todo.urlPath = function(id) {
    return this.basePath + '/' + id;
}

module.exports = Todo;
