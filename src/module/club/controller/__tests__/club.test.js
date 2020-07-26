const ClubController = require('../clubController');
const Club = require('../../entity/club');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(() => Promise.resolve(true)),
  getById: jest.fn(() => Promise.resolve({})),
  getAll: jest.fn(() => Promise.resolve([])),
};
const controller = new ClubController({}, serviceMock);

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

test('Create renderea form.html', () => {
  const renderMock = jest.fn();

  controller.create({}, { render: renderMock });

  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('club/view/form.html');
});

test('Save llama al servicio con el body y redirecciona a /club', async () => {
  const redirectMock = jest.fn();
  const FAKE_CREST_URL = 'ejemplo/escudo.png';
  const bodyMock = { id: 1, crestUrl: FAKE_CREST_URL };

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
