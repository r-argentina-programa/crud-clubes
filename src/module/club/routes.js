const ROUTE = '/club';

module.exports = function routes(controller, app) {
  app.get(`/`, controller.index);
  app.get(`${ROUTE}`, controller.index);
  app.get(`${ROUTE}/create`, controller.create);
  app.get(`${ROUTE}/update/:team`, controller.update);
  app.get(`${ROUTE}/delete/:team`, controller.delete);
};
