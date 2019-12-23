const { Router } = require('express');
const { User, Recipe } = require('../../models');

const router = Router();

router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) return res.status(400).send({ message: 'Bad request' });

    const user = await User.findOne({
      where: { id },
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

    if (!user) return res.status(404).send({ message: 'User not found' });

    return res.status(200).send({ user });
  } catch (e) {
    console.error(e);
    return res.status(500).send({ message: 'Internal server error.' });
  }
});

module.exports = router;
