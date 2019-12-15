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
};

class Tag extends Sequelize.Model {
  static init(sequelize) {
    return super.init(schema, {
      sequelize,
      tableName: 'tags',
    });
  }

  static associate(models) {
    this.belongsToMany(models.Recipe, {
      as: 'tags',
      through: 'recipes_tags',
      foreignKey: 'tagId',
    });
  }
}

module.exports = Tag;
