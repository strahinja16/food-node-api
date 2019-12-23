// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface) => {
    const recipes = await queryInterface.sequelize.query(
      'SELECT id from recipes;',
    );
    const recipeRows = recipes[0];

    const preparationStepData = [];

    recipeRows.forEach((recipe) => {
      for (let i = 0; i < 5; i++) {
        preparationStepData.push({
          id: uuid(),
          RecipeId: recipe.id,
          orderNum: i + 1,
          preparation: faker.lorem.sentences(3),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    const ingredientNames = ['chicken', 'tomato', 'fish', 'lettuce', 'pork'];
    const ingredientData = [];
    const ingredientsPreparationStepsData = [];

    for (let i = 0; i < 5; i++) {
      ingredientData.push({
        id: uuid(),
        name: ingredientNames[i],
        price: faker.random.number({ min: 10, max: 50 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    preparationStepData.forEach((preparationStep, index, array) => {
      ingredientsPreparationStepsData.push({
        id: index,
        preparationStepId: preparationStep.id,
        ingredientId: ingredientData[faker.random.number({ min: 0, max: 4 })].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      ingredientsPreparationStepsData.push({
        id: index + array.length,
        preparationStepId: preparationStep.id,
        ingredientId: ingredientData[faker.random.number({ min: 0, max: 4 })].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert('preparationSteps', preparationStepData, {});
    await queryInterface.bulkInsert('ingredients', ingredientData, {});
    await queryInterface.bulkInsert('preparationSteps_ingredients', ingredientsPreparationStepsData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('preparationSteps_ingredients', null, {});
    await queryInterface.bulkDelete('ingredients', null, {});
    await queryInterface.bulkDelete('preparationSteps', null, {});
  },
};
