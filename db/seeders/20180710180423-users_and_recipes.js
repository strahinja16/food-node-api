// eslint-disable-next-line import/no-extraneous-dependencies
const faker = require('faker');
const uuid = require('uuid/v4');
const passwordHash = require('password-hash');

module.exports = {
  up: async (queryInterface) => {
    const userData = [];
    const recipeData = [];
    const usersRecipes = [];

    for (let i = 0; i < 10; i++) {
      userData.push({
        id: uuid(),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: `user${i}@test.com`,
        password: passwordHash.generate('test'),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < 5; i++) {
      recipeData.push({
        id: uuid(),
        UserId: userData[0].id,
        title: faker.name.title(),
        image: faker.image.image(),
        prepTime: faker.random.number({ min: 2, max: 60 }),
        servings: faker.random.number({ min: 2, max: 5 }),
        kcal: faker.random.number({ min: 200, max: 600 }),
        carbs: faker.random.number({ min: 50, max: 150 }),
        fat: faker.random.number({ min: 10, max: 60 }),
        protein: faker.random.number({ min: 20, max: 80 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < 5; i++) {
      recipeData.push({
        id: uuid(),
        UserId: userData[1].id,
        title: faker.name.title(),
        image: faker.image.image(),
        prepTime: faker.random.number({ min: 2, max: 60 }),
        servings: faker.random.number({ min: 2, max: 5 }),
        kcal: faker.random.number({ min: 200, max: 600 }),
        carbs: faker.random.number({ min: 50, max: 150 }),
        fat: faker.random.number({ min: 10, max: 60 }),
        protein: faker.random.number({ min: 20, max: 80 }),
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < 3; i++) {
      usersRecipes.push({
        id: uuid(),
        userId: userData[0].id,
        likedRecipeId: recipeData[5 + i].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    for (let i = 0; i < 3; i++) {
      usersRecipes.push({
        id: uuid(),
        userId: userData[1].id,
        likedRecipeId: recipeData[i].id,
        createdAt: new Date(),
        updatedAt: new Date(),
      });
    }

    await queryInterface.bulkInsert('users', userData, {});
    await queryInterface.bulkInsert('recipes', recipeData, {});
    await queryInterface.bulkInsert('users_likedRecipes', usersRecipes, {});
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('users_likedRecipes', null, {});
    await queryInterface.bulkDelete('recipes', null, {});
    await queryInterface.bulkDelete('users', null, {});
  },
};
