import _         from 'lodash';
import config    from 'config';
import Sequelize from 'sequelize';

const {
    auto_timestamps,
    connection: {url, ...conf},
    pool,
    soft_delete
} = config.get('database');

let sequelize = null;

if (url) {
    sequelize = new Sequelize(url);
} else {
    const {name, username, password, engine, host, file} = conf;

    sequelize = new Sequelize(name, username, password, {
        dialect: engine,
        host:    host,
        storage: file,

        pool: pool && {
            max:  pool.max,
            min:  pool.min,
            idle: pool.idle
        }
    });
}

// just a simple wrapper around Sequelize that allows us to manage the instance,
// set some sensible defaults like underscored=true and paranoid=true,
// and keep track of paths for returning URLs
export default {
    sequelize: null,

    connect() {
        return sequelize.authenticate();
    },

    define(name, fields, options) {
        let model = null;

        _.defaultsDeep(options, {
            paranoid:    soft_delete,
            underscored: auto_timestamps,

            instanceMethods: {
                toJSON: () => _.omit(this.get(), model.privateAttributes)
            },

            classMethods: {
                url: id => config.get('server.api_root') + this.urlPath(id),

                urlPath: id => model.basePath + '/' + id
            },

            getterMethods: {
                url: () => model.url(this.id)
            }
        });

        const {basePath, privateAttributes} = options;

        model = sequelize.define(name, fields, options);

        model.basePath          = basePath;
        model.privateAttributes = privateAttributes || [];

        model.privateAttributes.push('deletedAt');

        return model;
    }
};
