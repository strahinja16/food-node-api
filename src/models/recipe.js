const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  image: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  prepTime: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  servings: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  kcal: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  carbs: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  fat: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  protein: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
};

class Recipe extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'recipes',
    });
  }

  static associate(models) {
    this.belongsTo(models.User, { as: 'user', foreignKey: 'UserId' });

    this.belongsToMany(models.User, {
      as: 'likedUsers',
      through: 'users_likedRecipes',
      foreignKey: 'likedRecipeId',
    });

    this.belongsToMany(models.Tag, {
      as: 'tags',
      through: 'recipes_tags',
      foreignKey: 'recipeId',
    });

    this.hasMany(models.PreparationStep);
  }
}

module.exports = Recipe;
