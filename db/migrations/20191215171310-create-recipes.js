module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('recipes', {
    id: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    UserId: {
      type: Sequelize.UUID,
      references: {
        model: 'users',
        key: 'id',
      },
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
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: queryInterface => queryInterface.dropTable('recipes'),
};
