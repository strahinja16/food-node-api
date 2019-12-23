const { Op } = require('sequelize');
const { Recipe } = require('../models');


const getRecipesByQuery = async (request) => {
  let where = {
    title: {
      [Op.like]: `%${request.query}%`,
    },
  };

  if (request.prepTime) { where = { ...where, prepTime: { [Op.gte]: request.prepTime } }; }

  if (request.servings) { where = { ...where, servings: { [Op.gte]: request.servings } }; }

  if (request.kcal) { where = { ...where, kcal: { [Op.gte]: request.kcal } }; }

  if (request.fat) { where = { ...where, fat: { [Op.gte]: request.fat } }; }

  if (request.protein) { where = { ...where, protein: { [Op.gte]: request.protein } }; }

  if (request.carbs) { where = { ...where, carbs: { [Op.gte]: request.carbs } }; }

  return Recipe.findAll({
    where,
  });
};

module.exports = {
  getRecipesByQuery,
};
