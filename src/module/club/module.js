const configureRoutes = require('./routes');
const ClubController = require('./controller/clubController');
const ClubRepository = require('./repository/sqlite/clubRepository');
const ClubService = require('./service/clubService');
const ClubModel = require('./repository/sqlite/clubModel');

function init(app, container) {
  configureRoutes(container.get('ClubController'), app);
}

module.exports = {
  init,
  ClubController,
  ClubService,
  ClubRepository,
  ClubModel,
};
