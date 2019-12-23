const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  orderNum: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  preparation: {
    type: Sequelize.STRING,
    allowNull: false,
  },
};

class PreparationStep extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'preparationSteps',
    });
  }

  static associate(models) {
    this.belongsTo(models.Recipe, {
      as: 'recipe',
      foreignKey: 'RecipeId',
    });

    this.belongsToMany(models.Ingredient, {
      as: 'ingredients',
      through: 'preparationSteps_ingredients',
      foreignKey: 'preparationStepId',
    });
  }
}

module.exports = PreparationStep;
