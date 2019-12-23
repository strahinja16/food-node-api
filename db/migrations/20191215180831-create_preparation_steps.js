module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('preparationSteps', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    RecipeId: {
      type: Sequelize.UUID,
      references: {
        model: 'recipes',
        key: 'id',
      },
    },
    orderNum: {
      type: Sequelize.INTEGER,
      allowNull: false,
    },
    preparation: {
      type: Sequelize.STRING,
      allowNull: false,
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
  down: queryInterface => queryInterface.dropTable('preparationSteps'),
};
