const bodyParser = require('body-parser');
const express = require('express');
const routes = require('./routes');

const config = {
  PORT: process.env.APP_PORT || '9000',
  ENV: process.env.NODE_ENV || 'development',
  DB_URL: process.env.DB_URL || 'mongodb://localhost:27017/learn-ar',
}

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', routes);

app.listen(config.PORT, () => {
  console.log(`starting ${config.ENV} server at http://localhost:${config.PORT}`);
});