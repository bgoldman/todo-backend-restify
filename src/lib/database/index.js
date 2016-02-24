import _         from 'lodash';
import config    from 'config';
import Sequelize from 'sequelize';

const conf = config.get('database');

const {
    auto_timestamps,
    connection: {url, name, username, password, engine, host, file},
    pool,
    soft_delete
} = config.get('database');

let sequelize = null;

if (url) {
    sequelize = new Sequelize(url);
} else {
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
                toJSON() {
                    return _.omit(this.get(), model.privateAttributes)
                }
            },

            classMethods: {
                url(id) {
                    return config.get('server.api_root') + this.urlPath(id);
                },

                urlPath(id) {
                    return model.basePath + '/' + id;
                }
            },

            getterMethods: {
                url() {
                    return model.url(this.id);
                }
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
