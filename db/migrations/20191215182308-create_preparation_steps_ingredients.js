module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('preparationSteps_ingredients', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
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
