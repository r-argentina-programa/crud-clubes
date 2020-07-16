// configure DI container
const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const { ClubController, ClubService, ClubRepository } = require('../module/club/module');

function configureSequelize() {
  return new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('ClubService')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('Sequelize')),
    Sequelize: factory(configureSequelize),
  });
  return container;
};
