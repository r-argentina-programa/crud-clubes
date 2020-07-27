const AreaController = require('./controller/areaController');
const AreaRepository = require('./repository/sqlite/areaRepository');
const AreaService = require('./service/areaService');
const AreaModel = require('./repository/sqlite/areaModel');

/**
 * @param {import('express').Application} app
 * @param {import('rsdi').IDIContainer} container
 */
function init(app, container) {
  /**
   * @type {AreaController} controller;
   */
  const controller = container.get('AreaController');
  controller.configureRoutes(app);
}

module.exports = {
  init,
  AreaController,
  AreaService,
  AreaRepository,
  AreaModel,
};
