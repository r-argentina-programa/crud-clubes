require('dotenv').config();
const express = require('express');
const nunjucks = require('nunjucks');

const configureDependencyInjection = require('./config/di');
const { init: initClubModule } = require('./module/club/module');
const { init: initAreaModule } = require('./module/area/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use('/public', express.static('public'));

// https://mozilla.github.io/nunjucks/getting-started.html#when-using-node
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const container = configureDependencyInjection(app);
app.use(container.get('Session'));

initClubModule(app, container);
initAreaModule(app, container);

/**
 * @type {import('./module/club/controller/clubController')} controller;
 */
const clubController = container.get('ClubController');
app.get('/', clubController.index.bind(clubController));

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
