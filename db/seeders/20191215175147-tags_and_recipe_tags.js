// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const uuid = require('uuid/v4');

module.exports = {
  up: async (queryInterface) => {
    const tagNames = ['gluten free', 'vegan', 'vegetarian', 'low carb', 'low fat'];
    const tagData = [];
    const tagsRecipesData = [];

    for (let i = 0; i < 5; i++) {
      tagData.push({
        id: uuid(),
        name: tagNames[i],
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    const recipes = await queryInterface.sequelize.query(
      'SELECT id from recipes;',
    );
    const recipeRows = recipes[0];

    tagData.forEach((tag, index, tags) => {
      tagsRecipesData.push({
        id: index,
        tagId: tag.id,
        recipeId: recipeRows[faker.random.number({ min: 0, max: 9 })].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
      tagsRecipesData.push({
        id: index + tags.length,
        tagId: tag.id,
        recipeId: recipeRows[faker.random.number({ min: 0, max: 9 })].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    });

    await queryInterface.bulkInsert('tags', tagData, {});
    await queryInterface.bulkInsert('recipes_tags', tagsRecipesData, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('recipes_tags', null, {});
    await queryInterface.bulkDelete('tags', null, {});
  },
};
