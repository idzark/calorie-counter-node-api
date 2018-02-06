/* eslint-disable no-console */
require('./models/User');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const validator = require('express-validator');
const routes = require('./routes/index');
const errorHandlers = require('./handlers/errorHandlers');


require('dotenv').config({ path: 'variables.env' });


const app = express();


app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(validator());

app.use('/api', routes);

app.use(errorHandlers.notFound);

if (app.get('env') === 'development') {
  app.use(errorHandlers.devErrors);
}

app.use(errorHandlers.prodErrors);

mongoose.connect(process.env.DATABASE, {
  useMongoClient: true
}, (err) => {
  if (!err) {
    console.log('Connected to mongo');
  }
});
mongoose.Promise = global.Promise;


app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
  console.log(`App running on port ${server.address().port}`);
});
