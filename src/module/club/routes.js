const ROUTE = '/club';

/**
 *
 * @param {import('./controller/club')} controller
 * @param {import('express').Application} app
 */
module.exports = function routes(controller, app) {
  app.get(`/`, controller.index.bind(controller));
  app.get(`${ROUTE}`, controller.index.bind(controller));
  app.get(`${ROUTE}/view`, controller.view.bind(controller));
  app.get(`${ROUTE}/view/:team`, controller.view.bind(controller));
  app.post(`${ROUTE}/save`, controller.save.bind(controller));
  app.get(`${ROUTE}/delete/:team`, controller.delete.bind(controller));
};
