const { Router } = require('express');
const {
  Recipe, Tag, PreparationStep, Ingredient,
} = require('../../models');

const router = Router();

router.get('/:id/detailed', async (req, res) => {
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

module.exports = router;
