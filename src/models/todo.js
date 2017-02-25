import Sequelize from 'sequelize';

import Database from '../lib/database';

export default Database.define('Todo', {
  createdAt: {
    type:      Sequelize.DATE,
    allowNull: true,
    field:     'created_at',
  },
  updatedAt: {
    type:      Sequelize.DATE,
    allowNull: true,
    field:     'updated_at',
  },
  deletedAt: {
    type:      Sequelize.DATE,
    allowNull: true,
    field:     'deleted_at',
  },
  title: {
    type:      Sequelize.STRING(128),
    allowNull: false,

    validate: {
      notEmpty: true,
      isLength: { min: 1, max: 32 },
    },
  },
  completed: {
    type:         Sequelize.BOOLEAN,
    allowNull:    true,
    defaultValue: false,

    validate: { isBoolean: true },

    get: () => !!this.getDataValue('completed'),
  },
  order: {
    type:         Sequelize.INTEGER(4),
    field:        'sort_order',
    allowNull:    true,
    defaultValue: 1,

    validate: {
      isNumeric: true,
      isInt:     { min: 1, max: 1000 },
    },
  },
}, {
  basePath: '/todos',

  classMethods: {
    allOrdered() { return this.findAll({ order: 'sort_order' }); },

    archiveCompleted() { return this.destroy({ where: { completed: true } }); },
  },
});
