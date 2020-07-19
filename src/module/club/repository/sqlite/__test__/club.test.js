const Sequelize = require('sequelize');
const ClubRepository = require('../../club');

const sequelize = new Sequelize('sqlite::memory:');

const repository = new ClubRepository(sequelize);

test('Guarda un equipo', () => {
  console.log(repository.save());
});
