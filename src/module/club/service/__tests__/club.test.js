const ClubService = require('../club');
const ClubNotDefinedError = require('../exception/clubNotDefinedError');
const IdNotDefinedError = require('../exception/idNotDefinedError');

const repositoryMock = {
  save: jest.fn(),
  delete: jest.fn(),
  get: jest.fn(),
  getAll: jest.fn(),
};

const service = new ClubService(repositoryMock);

test('Guardar un equipo llama al método save del repositorio 1 vez', () => {
  service.save({});
  expect(repositoryMock.save).toHaveBeenCalledTimes(1);
});

test('Llamar a guardar un equipo sin pasar un equipo da un error específico', () => {
  expect(service.save).toThrowError(ClubNotDefinedError);
});

test('Eliminar un equipo llama al método delete del repositorio 1 vez', () => {
  service.delete({});
  expect(repositoryMock.delete).toHaveBeenCalledTimes(1);
});

test('Llamar a eliminar un equipo sin pasar un equipo da un error específico', () => {
  expect(service.delete).toThrowError(ClubNotDefinedError);
});

test('Consultar un equipo por id llama al método get del repositorio 1 vez', () => {
  service.getById(1);
  expect(repositoryMock.get).toHaveBeenCalledTimes(1);
});

test('Llamar a consultar un equipo sin pasar un equipo da un error específico', () => {
  expect(service.getById).toThrowError(IdNotDefinedError);
});

test('Consultar todos los equipos llama al método getAll del repositorio 1 vez', () => {
  service.getAll();
  expect(repositoryMock.getAll).toHaveBeenCalledTimes(1);
});
