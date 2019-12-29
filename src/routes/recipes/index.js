/* eslint-disable no-restricted-syntax,no-await-in-loop */
const { Router } = require('express');
const middleware = require('../../middleware');
const validate = require('../../middleware/validate');
const likeDislikeRecipeRequest = require('../../requests/recipes/likeDislikeRecipe');
const recipeSearchRequest = require('../../requests/recipes/recipeSearch');
const createRecipeRequest = require('../../requests/recipes/createRecipe');
const recipeRepository = require('../../repositories/recipe');
const {
  Recipe, Tag, PreparationStep, Ingredient, User,
} = require('../../models');

const router = Router();

router.post('/search',
  middleware('auth'),
  validate(recipeSearchRequest),
  async (req, res) => {
    try {
      const recipes = await recipeRepository.getRecipesByQuery(req.body);

      return res.status(200).send({ recipes });
    } catch (e) {
      console.error(e);
      return res.status(500).send({ message: 'Internal server error.' });
    }
  });

router.get('/:id/detailed', middleware('auth'), async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: 'Bad request' });

    const recipe = await Recipe.findOne({
      where: { id },
      include: [
        {
          model: Tag,
          as: 'tags',
          through: { attributes: [] },
        },
        {
          model: PreparationStep,
          include: [{
            model: Ingredient,
            as: 'ingredients',
            through: { attributes: [] },
          }],
        },
      ],
    });

    if (!recipe) return res.status(404).send({ message: 'Recipe not found' });

    return res.status(200).send({ recipe });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Internal server error.' });
  }
});

router.post('/:id/like',
  middleware('auth'),
  validate(likeDislikeRecipeRequest),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      if (!id || !userId) return res.status(400).send({ message: 'Bad request' });

      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Recipe,
          },
          {
            model: Recipe,
            as: 'likedRecipes',
            through: { attributes: [] },
          }],
      });

      const userOwnsRecipe = !!user.Recipes.find(r => r.id === id);
      const userAlreadyLikedRecipe = !!user.likedRecipes.find(r => r.id === id);

      if (userOwnsRecipe || userAlreadyLikedRecipe) {
        return res.status(400).send({ message: 'User owns or has already liked recipe.' });
      }

      await user.addLikedRecipe(id);

      return res.status(200).send();
    } catch (e) {
      console.error(e);
      return res.status(500).send({ message: 'Internal server error.' });
    }
  });

router.post('/:id/dislike',
  middleware('auth'),
  validate(likeDislikeRecipeRequest),
  async (req, res) => {
    try {
      const { id } = req.params;
      const { userId } = req.body;
      if (!id || !userId) return res.status(400).send({ message: 'Bad request' });

      const user = await User.findOne({
        where: { id: userId },
        include: [
          {
            model: Recipe,
          },
          {
            model: Recipe,
            as: 'likedRecipes',
            through: { attributes: [] },
          }],
      });

      const userOwnsRecipe = !!user.Recipes.find(r => r.id === id);
      const userAlreadyLikedRecipe = !!user.likedRecipes.find(r => r.id === id);

      if (userOwnsRecipe || !userAlreadyLikedRecipe) {
        return res.status(400).send({ message: 'User owns or hasn\'t liked recipe.' });
      }

      await user.removeLikedRecipe(id);

      return res.status(200).send();
    } catch (e) {
      console.error(e);
      return res.status(500).send({ message: 'Internal server error.' });
    }
  });

router.post('/',
  middleware('auth'),
  validate(createRecipeRequest),
  async (req, res) => {
    try {
      const { tags, preparationSteps, ...recipe } = req.body;
      const user = await User.findById(recipe.UserId);
      if (!user) return res.status(404).send({ message: 'User not found.' });

      const createdRecipe = await Recipe.create(recipe);
      const createdTags = await Tag.bulkCreate(tags);
      await createdRecipe.addTags(createdTags);

      const ingredientsByPrepStep = {};
      let allIngredients = [];
      const prepStepsForCreate = preparationSteps.map(({ ingredients, ...prepStep }) => {
        allIngredients = allIngredients.concat(ingredients);
        ingredientsByPrepStep[prepStep.orderNum] = ingredients.map(ing => ing.name);
        return { RecipeId: createdRecipe.id, ...prepStep };
      });

      const prepSteps = await PreparationStep
        .bulkCreate(prepStepsForCreate)
        .map(ing => ing.get({ plain: true }));
      const createdIngredients = await Ingredient.bulkCreate(allIngredients);

      // noinspection ES6MissingAwait
      prepSteps.forEach(async ({ id, orderNum }) => {
        const preparationStep = await PreparationStep.findById(id);
        const ingsForRelationship = createdIngredients
          .filter(ci => ingredientsByPrepStep[orderNum].includes(ci.dataValues.name));
        preparationStep.addIngredients(ingsForRelationship);
      });

      return res.status(201).send();
    } catch (e) {
      console.error(e);
      return res.status(500).send({ message: 'Internal server error.' });
    }
  });

router.get('/', middleware('auth'), async (req, res) => {
  try {
    const recipes = await Recipe.findAll().filter(r => r.prepTime % 3 === 0);

    return res.status(200).send({ recipes });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Internal server error.' });
  }
});

module.exports = router;
