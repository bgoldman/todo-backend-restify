import config from 'config';

const conf = config.get('database.connection');

export default {
    url:      conf.url,
    dialect:  conf.engine,
    host:     conf.host,
    database: conf.name,
    username: conf.username,
    password: conf.password,
    storage:  conf.file
};
