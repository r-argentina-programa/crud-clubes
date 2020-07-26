const ROUTE = '/club';

/**
 *
 * @param {import('./controller/clubController')} controller
 * @param {import('express').Application} app
 */
module.exports = function routes(controller, app) {
  app.get(`/`, controller.index.bind(controller));
  app.get(`${ROUTE}`, controller.index.bind(controller));
  app.get(`${ROUTE}/create`, controller.create.bind(controller));
  app.get(`${ROUTE}/view/:id`, controller.edit.bind(controller));
  app.post(`${ROUTE}/save`, controller.save.bind(controller));
  app.get(`${ROUTE}/delete/:id`, controller.delete.bind(controller));
};
