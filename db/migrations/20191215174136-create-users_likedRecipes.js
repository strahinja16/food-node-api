module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('users_likedRecipes', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
    },
    likedRecipeId: {
      type: Sequelize.UUID,
      references: {
        model: 'recipes',
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
  down: queryInterface => queryInterface.dropTable('users_likedRecipes'),
};
