const Joi = require('joi');

module.exports = {
  query: Joi.string().required(),
  prepTime: Joi.number().integer(),
  servings: Joi.number().integer(),
  kcal: Joi.number().integer(),
  protein: Joi.number().integer(),
  carbs: Joi.number().integer(),
  fat: Joi.number().integer(),
};
