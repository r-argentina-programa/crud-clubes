/* eslint max-classes-per-file: "off" */

const AbstractClubRepository = require('../abstractClubRepository');
const AbstractClubRepositoryError = require('../error/abstractClubRepositoryError');
const MethodNotImplementedError = require('../error/methodNotImplementedError');

test('No se puede instanciar un repositorio abstracto', () => {
  let repoInstance;
  try {
    repoInstance = new AbstractClubRepository();
  } catch (e) {
    expect(e).toBeInstanceOf(AbstractClubRepositoryError);
  } finally {
    expect(repoInstance).toBeUndefined();
  }
});

test('Se puede instanciar un repositorio concreto que herede del repositorio abstracto', () => {
  const ConcreteRepository = class extends AbstractClubRepository {};
  const respositoryInstance = new ConcreteRepository();
  expect(respositoryInstance).toBeInstanceOf(ConcreteRepository);
  expect(respositoryInstance).toBeInstanceOf(AbstractClubRepository);
});

test('Llamar a métodos base sin implementación concreta da error', () => {
  const ConcreteRepository = class extends AbstractClubRepository {};
  const respositoryInstance = new ConcreteRepository();

  expect(() => respositoryInstance.save()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => respositoryInstance.delete()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => respositoryInstance.getAll()).rejects.toThrowError(MethodNotImplementedError);
  expect(() => respositoryInstance.getById()).rejects.toThrowError(MethodNotImplementedError);
});
