// configure DI container
const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const { ClubController, ClubService, ClubRepository, ClubModel } = require('../module/club/module');

function configureSequelize() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
  sequelize.sync();
  return sequelize;
}

function configureClubModule(di) {
  return ClubModel.setup(di.get('Sequelize'));
}

module.exports = function configureDI() {
  const container = new DIContainer();
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('ClubService')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('ClubModel')),
    ClubModel: factory(configureClubModule),
    Sequelize: factory(configureSequelize),
  });
  return container;
};
