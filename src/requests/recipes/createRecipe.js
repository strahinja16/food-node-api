const Joi = require('joi');

const tagSchema = Joi.object().keys({
  name: Joi.string().required(),
});

const ingredientSchema = Joi.object().keys({
  name: Joi.string().required(),
  price: Joi.number().integer().required(),
});

const preparationStepSchema = Joi.object().keys({
  orderNum: Joi.number().integer().required(),
  preparation: Joi.string().required(),
  ingredients: Joi.array().items(ingredientSchema).required(),
});

module.exports = {
  UserId: Joi.string().required(),
  title: Joi.string().required(),
  image: Joi.string().required(),
  prepTime: Joi.number().integer().required(),
  servings: Joi.number().integer().required(),
  kcal: Joi.number().integer().required(),
  carbs: Joi.number().integer().required(),
  fat: Joi.number().integer().required(),
  protein: Joi.number().integer().required(),
  tags: Joi.array().items(tagSchema).required(),
  preparationSteps: Joi.array().items(preparationStepSchema).required(),
};
