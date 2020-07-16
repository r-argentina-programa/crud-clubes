const express = require('express');
const nunjucks = require('nunjucks');
const configureDependencyInjection = require('./config/di');
const { init: initClubModule } = require('./module/club/module');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.static('public'));

// https://mozilla.github.io/nunjucks/getting-started.html#when-using-node
nunjucks.configure('src/module', {
  autoescape: true,
  express: app,
});

const container = configureDependencyInjection();

initClubModule(app, container);

app.listen(port, () => console.log(`Server listening at http://localhost:${port}`));
