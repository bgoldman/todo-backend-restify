var config = require('config');

var conf = config.get('database.connection');

module.exports = {
    url:      conf.url,
    dialect:  conf.engine,
    host:     conf.host,
    database: conf.name,
    username: conf.username,
    password: conf.password,
    storage:  conf.file
};
