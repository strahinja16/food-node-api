const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('./models');

const app = express();

/**
 * Init middleware
 */
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors());

if (process.env.NODE_ENV === 'development') {
  app.use((req, res, next) => {
    // eslint-disable-next-line no-console
    console.info(`${req.method}: ${req.url}`);
    next();
  });
}

app.use('/api', require('./routes'));

/**
 * Exports express
 * @public
 */
module.exports = app;
