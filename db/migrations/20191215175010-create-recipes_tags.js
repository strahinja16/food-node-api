module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recipes_tags', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    recipeId: {
      type: Sequelize.UUID,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
    tagId: {
      type: Sequelize.UUID,
      references: {
        model: 'tags',
        key: 'id',
      },
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('recipes_tags'),
};
