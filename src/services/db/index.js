const Sequelize = require('sequelize');
const { db } = require('../../config');

const {
  host, user, password, database,
} = db;

const sequelize = new Sequelize(database, user, password, {
  host,
  dialect: 'postgres',
  operatorsAliases: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },

  // eslint-disable-next-line no-console
  logging: process.env.NODE_ENV === 'development' ? console.log : false,

  define: {
    underscored: false,
  },
});

module.exports = sequelize;
