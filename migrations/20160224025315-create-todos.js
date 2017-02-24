'use strict';

module.exports = {
    up(queryInterface, Sequelize) {
         return queryInterface.createTable(
            'todos',
            {
                id: {
                    type:          Sequelize.INTEGER,
                    primaryKey:    true,
                    autoIncrement: true
                },
                createdAt: {
                    field: 'created_at',
                    type:  Sequelize.DATE
                },
                updatedAt: {
                    field: 'updated_at',
                    type:  Sequelize.DATE
                },
                deletedAt: {
                    field: 'deleted_at',
                    type:  Sequelize.DATE
                },
                title: {
                    type:      Sequelize.STRING(64),
                    allowNull: false
                },
                completed: {
                    type:         Sequelize.BOOLEAN,
                    allowNull:    true,
                    defaultValue: false
                },
                order: {
                    type:         Sequelize.INTEGER(4),
                    field:        'sort_order',
                    allowNull:    false,
                    defaultValue: 1
                }
            }
        );
    },

    down(queryInterface, Sequelize) {
        return queryInterface.dropTable('todos');
    }
};
