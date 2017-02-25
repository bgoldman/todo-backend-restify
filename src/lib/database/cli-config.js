import config from 'config';

const conf = config.get('database.connection');

// not using `export default` because sequelize-cli can't read it that way
module.exports = {
  url:      conf.url,
  dialect:  conf.engine,
  host:     conf.host,
  database: conf.name,
  username: conf.username,
  password: conf.password,
  storage:  conf.file,
};
