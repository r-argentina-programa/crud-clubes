const ClubController = require('../clubController');

const serviceMock = {
  save: jest.fn(),
  delete: jest.fn(),
  getAll: jest.fn(() => Promise.resolve([])),
};
const controller = new ClubController(serviceMock);

test('Index renderea index.html', async () => {
  const renderMock = jest.fn();
  await controller.index({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('club/view/index.html', { data: { clubs: [] } });
});

test('View renderea form.html', () => {
  const renderMock = jest.fn();
  controller.view({}, { render: renderMock });
  expect(renderMock).toHaveBeenCalledTimes(1);
  expect(renderMock).toHaveBeenCalledWith('club/view/form.html');
});

test('Save llama al servicio con el body y redirecciona a /club', async () => {
  const redirectMock = jest.fn();
  const bodyMock = { id: 1 };
  await controller.save({ body: bodyMock }, { redirect: redirectMock });
  expect(serviceMock.save).toHaveBeenCalledTimes(1);
  expect(serviceMock.save).toHaveBeenCalledWith(bodyMock);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/club');
});

test('Delete llama al servicio con el id del body y redirecciona a /club', () => {
  const redirectMock = jest.fn();
  controller.delete({ body: { id: 1 } }, { redirect: redirectMock });
  expect(serviceMock.delete).toHaveBeenCalledTimes(1);
  expect(serviceMock.delete).toHaveBeenCalledWith(1);
  expect(redirectMock).toHaveBeenCalledTimes(1);
  expect(redirectMock).toHaveBeenCalledWith('/club');
});
