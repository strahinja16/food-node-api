module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('preparationSteps_ingredients', {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
    },
    preparationStepId: {
      type: Sequelize.UUID,
      references: {
        model: 'preparationSteps',
        key: 'id',
      },
    },
    ingredientId: {
      type: Sequelize.UUID,
      references: {
        model: 'ingredients',
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
  down: queryInterface => queryInterface.dropTable('preparationSteps_ingredients'),
};
