const AbstractController = require('../abstractController');
const AbstractControllerError = require('../error/abstractControllerError');

test('No se puede crear una nueva instancia de un AbstractController directamente', () => {
  try {
    // eslint-disable-next-line no-new
    new AbstractController();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractControllerError);
  }
});

test('Se puede crear una nueva instancia de una clase que hereda de AbstractController', () => {
  const ConcreteController = class extends AbstractController {};
  expect(new ConcreteController()).toBeInstanceOf(AbstractController);
});
