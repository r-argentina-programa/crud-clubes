const ClubController = require('../clubController');
const Club = require('../../entity/club');
const Area = require('../../../area/entity/area');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};
const controller = new ClubController({}, serviceMock, serviceMock);

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

test('Create muestra un error si no hay áreas en el sistema', async () => {
  const mockRes = { redirect: jest.fn() };
  const mockReq = { session: {} };
  await controller.create(mockReq, mockRes);
  expect(mockRes.redirect).toHaveBeenCalledTimes(1);
  expect(mockReq.session.errors).toEqual(['Para crear un club, primero debe crear un área']);
});

test('Create renderea form.html', async () => {
  const renderMock = jest.fn();
  const mockAreasData = [new Area({ id: 1, name: 'Argentina' })];
  serviceMock.getAll.mockImplementationOnce(() => mockAreasData);
  await controller.create({}, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('club/view/form.html', {
    data: { areas: mockAreasData },
  });
});

test('Save llama al servicio con el body y redirecciona a /club', async () => {
  const redirectMock = jest.fn();
  const FAKE_CREST_URL = 'ejemplo/escudo.png';
  const bodyMock = new Club({
    Area: {
      id: NaN,
      name: undefined,
    },
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
