const ClubController = require('../clubController');
const Club = require('../../entity/club');
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError');

const uploadMiddleware = {
  single: jest.fn(),
};
const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};
const controller = new ClubController(uploadMiddleware, serviceMock);

test('Index renderea index.html', async () => {
  const renderMock = jest.fn();

  await controller.index({ session: { errors: [], messages: [] } }, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('club/view/index.html', {
    data: { clubs: [] },
    errors: [],
    messages: [],
  });
});

test('Create renderea form.html', async () => {
  const renderMock = jest.fn();
  await controller.create({}, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('club/view/form.html');
});

test('Save edita un club cuando hay un id presente', async () => {
  const redirectMock = jest.fn();
  const FAKE_CREST_URL = 'ejemplo/escudo.png';
  const bodyMock = new Club({
    address: undefined,
    clubColors: undefined,
    crestUrl: 'ejemplo/escudo.png',
    email: undefined,
    founded: undefined,
    id: 1,
    name: undefined,
    phone: undefined,
    shortName: undefined,
    tla: undefined,
    venue: undefined,
    website: undefined,
  });

  await controller.save(
    { body: bodyMock, file: { path: FAKE_CREST_URL }, session: {} },
    { redirect: redirectMock }
  );

  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/club');
});

test('Save crea un club cuando no hay id', async () => {
  serviceMock.save.mockReset();
  const redirectMock = jest.fn();
  const FAKE_CREST_URL = 'ejemplo/escudo.png';
  const bodyMock = new Club({
    address: undefined,
    clubColors: undefined,
    crestUrl: 'ejemplo/escudo.png',
    email: undefined,
    founded: undefined,
    name: undefined,
    phone: undefined,
    shortName: undefined,
    tla: undefined,
    venue: undefined,
    website: undefined,
  });

  await controller.save(
    { body: bodyMock, file: { path: FAKE_CREST_URL }, session: {} },
    { redirect: redirectMock }
  );

  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/club');
});

test('Delete llama al servicio con el id del body y redirecciona a /club', async () => {
  const FAKE_CLUB = new Club({ id: 1 });
  serviceMock.getById.mockImplementationOnce(() => Promise.resolve(FAKE_CLUB));
  const redirectMock = jest.fn();

  await controller.delete({ params: { id: 1 }, session: {} }, { redirect: redirectMock });

  expect(serviceMock.delete).toHaveBeenCalledTimes(1);
  expect(serviceMock.delete).toHaveBeenCalledWith(FAKE_CLUB);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/club');
});

test('Configura las rutas adecuadas', () => {
  const app = {
    get: jest.fn(),
    post: jest.fn(),
  };
  controller.configureRoutes(app);
});

test('View sin id da un error', async () => {
  expect(controller.view({ params: {} })).rejects.toThrowError(ClubIdNotDefinedError);
});

test('View obtiene el id del club y lo renderea', async () => {
  const MOCK_ID = 1;
  const renderMock = jest.fn();
  serviceMock.getById.mockImplementationOnce(() => {
    return {};
  });
  await controller.view({ params: { id: MOCK_ID } }, { render: renderMock });
  expect(serviceMock.getById).toHaveBeenCalledWith(MOCK_ID);
  expect(renderMock).toHaveBeenCalledWith('club/view/form.html', { data: { club: {} } });
});

test('View, cuando hay alguna excepción, seta errores en la sesión y redirecciona a club', async () => {
  serviceMock.getById.mockImplementationOnce(() => {
    throw Error('ejemplo');
  });

  const redirectMock = jest.fn();
  const req = { params: { id: 1 }, session: { errors: {} } };
  await controller.view(req, { redirect: redirectMock });

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(req.session.errors).not.toEqual([]);
});

test('Save, cuando hay alguna excepción, setea errores en la sesión y redirecciona a club', async () => {
  serviceMock.getById.mockImplementationOnce(() => {
    throw Error('ejemplo');
  });

  const redirectMock = jest.fn();
  const req = { params: { id: 1 }, session: { errors: {} } };
  await controller.save(req, { redirect: redirectMock });

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(req.session.errors).not.toEqual([]);
});

test('Save, cuando hay alguna excepción, setea errores en la sesión y redirecciona a club', async () => {
  serviceMock.save.mockImplementationOnce(() => {
    throw Error('ejemplo');
  });

  const redirectMock = jest.fn();
  const req = { params: { id: 1 }, session: { errors: {} } };
  await controller.save(req, { redirect: redirectMock });

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(req.session.errors).not.toEqual([]);
});

test('Delete, cuando hay alguna excepción, setea errores en la sesión y redirecciona a club', async () => {
  serviceMock.delete.mockImplementationOnce(() => {
    throw Error('ejemplo');
  });

  const redirectMock = jest.fn();
  const req = { params: { id: 1 }, session: { errors: {} } };
  await controller.delete(req, { redirect: redirectMock });

  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(req.session.errors).not.toEqual([]);
});
