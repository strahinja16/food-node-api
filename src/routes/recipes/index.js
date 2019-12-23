const { Router } = require('express');
const middleware = require('../../middleware');
const validate = require('../../middleware/validate');
const likeDislikeRecipeRequest = require('../../requests/recipes/likeDislikeRecipe');
const {
  Recipe, Tag, PreparationStep, Ingredient, User,
} = require('../../models');

const router = Router();

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

      const userOwnsRecipe = !!(await user.Recipes.find(r => r.id === id));
      const userAlreadyLikedRecipe = !!(await user.likedRecipes.find(r => r.id === id));

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

      const userOwnsRecipe = !!(await user.Recipes.find(r => r.id === id));
      const userAlreadyLikedRecipe = !!(await user.likedRecipes.find(r => r.id === id));

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

module.exports = router;
