const Sequelize = require('sequelize');
const ClubModel = require('../clubModel');
const AreaModel = require('../../../area/model/areaModel');

const sequelizeInstance = new Sequelize('sqlite::memory');

test('Después de hacerle un setup a Club Model y sincronizar el modelo, la tabla Clubs existe', async () => {
  ClubModel.setup(sequelizeInstance);
  AreaModel.setup(sequelizeInstance);
  ClubModel.setupAssociations(AreaModel);
  await ClubModel.sync({ force: true });
  expect(await ClubModel.findAll()).toEqual([]);
});
