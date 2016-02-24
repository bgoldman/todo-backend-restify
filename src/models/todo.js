import Sequelize from 'sequelize';

import Database from '../lib/database';

export default Database.define('todo', {
    // id:        auto,
    // createdAt: auto,
    // updatedAt: auto,
    // deletedAt: auto
    title: {
        type:      Sequelize.STRING(128),
        allowNull: false,

        validate: {
            notEmpty: true,
            isLength: {min: 1, max: 32}
        }
    },
    completed: {
        type:         Sequelize.BOOLEAN,
        allowNull:    true,
        defaultValue: false,

        get: function() {
            return !!this.getDataValue('completed');
        },

        validate: {
            isBoolean: true
        }
    },
    order: {
        type:         Sequelize.INTEGER(4),
        field:        'sort_order',
        allowNull:    true,
        defaultValue: 1,

        validate: {
            isNumeric: true,
            isInt:     {min: 1, max: 1000}
        }
    },
}, {
    basePath: '/todos',

    classMethods: {
        allOrdered: function() {
            return this.findAll({order: 'sort_order'});
        },

        archiveCompleted: function() {
            return this.destroy({where: {completed: true}});
        }
    }
});
