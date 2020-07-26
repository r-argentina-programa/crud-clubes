const Sequelize = require('sequelize');
const ClubModel = require('../clubModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

test('Después de hacerle un setup a Club Model y sincronizar el modelo, la tabla Clubs existe ', async () => {
  const TEST_ID = 1;
  ClubModel.setup(sequelizeInstance);
  await ClubModel.sync({ force: true });
  await ClubModel.create({ id: 1 });
  const club = await ClubModel.findOne({ where: { id: TEST_ID } });
  expect(club.id).toEqual(TEST_ID);
});
