import _ from 'lodash';
import config from 'config';
import Sequelize from 'sequelize';

const {
    auto_timestamps,
    connection: { url, ...conf },
    pool,
    soft_delete,
} = config.get('database');

let sequelize = null;

if (url) {
  sequelize = new Sequelize(url);
} else {
  const { name, username, password, engine, host, file } = conf;

  sequelize = new Sequelize(name, username, password, {
    dialect: engine,
    host,
    storage: file,

    pool: pool && {
      max: pool.max,
      min: pool.min,
      idle: pool.idle,
    },
  });
}

// just a simple wrapper around Sequelize that allows us to manage the instance,
// set some sensible defaults like underscored=true and paranoid=true,
// and keep track of paths for returning URLs
export default {
  connect() {
    return sequelize.authenticate();
  },

  define(modelName, fields, options) {
    let model = null;

    _.defaultsDeep(options, {
      paranoid: soft_delete,
      timestamps: auto_timestamps,

      instanceMethods: {
        toJSON() { return _.omit(this.get(), model.privateAttributes); },
      },

      classMethods: {
        fullUrl(id) { return config.get('server.api_root') + this.url(id); },

        url: id => `${model.basePath}/${id}`,
      },

      getterMethods: {
        url() { return model.url(this.id); },
      },
    });

    const { basePath, privateAttributes } = options;

    model = sequelize.define(modelName, fields, options);

    model.basePath = basePath;
    model.privateAttributes = privateAttributes || [];

    model.privateAttributes.push('deletedAt');

    return model;
  },
};
