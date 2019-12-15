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
          recipeId: recipe.id,
          orderNum: i + 1,
          preparation: faker.lorem.sentences(3),
          createdAt: new Date(),
          updatedAt: new Date(),
        });
      }
    });

    return queryInterface.bulkInsert('preparationSteps', preparationStepData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('preparationSteps', null, {});
  },
};
