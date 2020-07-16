const configureRoutes = require('./routes');
const ClubController = require('./controller/club');
const ClubRepository = require('./model/repository/club');
const ClubService = require('./model/service/club');

function init(app, container) {
  configureRoutes(container.get('ClubController'), app);
}

module.exports = {
  init,
  ClubController,
  ClubService,
  ClubRepository,
};
