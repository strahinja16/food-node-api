const Sequelize = require('sequelize');

const schema = {
  id: {
    type: Sequelize.UUID,
    defaultValue: Sequelize.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
};

class Ingredient extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'ingredients',
    });
  }

  static associate(models) {
    this.belongsToMany(models.PreparationStep, {
      as: 'ingredients',
      through: 'preparationSteps_ingredients',
      foreignKey: 'ingredientId',
    });
  }
}

module.exports = Ingredient;
