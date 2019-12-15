const Sequelize = require('sequelize');
const sequelize = require('../services/db');
const UserModel = require('./user');
const RecipeModel = require('./recipe');
const TagModel = require('./tag');
const PreparationStepModel = require('./preparationStep');
const IngredientModel = require('./ingredient');

const models = {
  User: UserModel.init(sequelize, Sequelize),
  Recipe: RecipeModel.init(sequelize, Sequelize),
  Tag: TagModel.init(sequelize, Sequelize),
  PreparationStep: PreparationStepModel.init(sequelize, Sequelize),
  Ingredient: IngredientModel.init(sequelize, Sequelize),
};

Object.values(models)
  .filter(model => typeof model.associate === 'function')
  .forEach(model => model.associate(models));

const db = {
  ...models,
  sequelize,
};

module.exports = db;
