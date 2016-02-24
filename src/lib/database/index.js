var _         = require('lodash');
var config    = require('config');
var Sequelize = require('sequelize');

var conf = config.get('database');

var sequelize;

if (conf.connection.url) {
    sequelize = new Sequelize(conf.connection.url);
} else {
    sequelize = new Sequelize(
        conf.connection.name,
        conf.connection.username,
        conf.connection.password,
        {
            host:    conf.connection.host,
            dialect: conf.connection.engine,
            storage: conf.connection.file,

            pool: conf.pool && {
                max:  conf.pool.max,
                min:  conf.pool.min,
                idle: conf.pool.idle
            }
        }
    );
}

// just a simple wrapper around Sequelize that allows us to manage the instance,
// set some sensible defaults like underscored=true and paranoid=true,
// and keep track of paths for returning URLs
export default {
    sequelize: null,

    connect: function() {
        return sequelize.authenticate();
    },

    define: function(name, fields, options) {
        var model;

        _.defaultsDeep(options, {
            paranoid:    conf.soft_delete,
            underscored: conf.auto_timestamps,

            instanceMethods: {
                toJSON: function() {
                    return _.omit(this.get(), model.privateAttributes)
                }
            },

            classMethods: {
                url: function(id) {
                    return config.get('server.api_root') + this.urlPath(id);
                },

                urlPath: function(id) {
                    return model.basePath + '/' + id;
                }
            },

            getterMethods: {
                url: function() {
                    return model.url(this.id);
                }
            }
        })

        model = sequelize.define(name, fields, options);

        model.basePath          = options.basePath;
        model.privateAttributes = options.privateAttributes || [];

        model.privateAttributes.push('deletedAt');

        return model;
    }
};
