const ClubController = require('./controller/clubController');
const ClubRepository = require('./repository/sqlite/clubRepository');
const ClubService = require('./service/clubService');
const ClubModel = require('./repository/sqlite/clubModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {ClubController} controller;
   */

  const controller = container.get('ClubController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  ClubController,
  ClubService,
  ClubRepository,
  ClubModel,
};
