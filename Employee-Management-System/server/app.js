const express = require('express');
const cors = require('cors');

const appRouter = require('./routes/appRouter');
const connection = require('./database/connection');
const errorController = require('./controllers/errorController');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/', appRouter);

app.use(errorController);

module.exports = app;
