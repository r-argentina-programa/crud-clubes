// configure DI container
const path = require('path');
const { default: DIContainer, object, get, factory } = require('rsdi');
const { Sequelize } = require('sequelize');
const multer = require('multer');

const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const { ClubController, ClubService, ClubRepository, ClubModel } = require('../module/club/module');
const { AreaController, AreaService, AreaRepository, AreaModel } = require('../module/area/module');

const setupSequelizeModelAssociations = require('./associations');

function configureMainSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.DB_PATH,
  });
  return sequelize;
}

function configureSessionSequelizeDatabase() {
  const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: process.env.SESSION_DB_PATH,
  });
  return sequelize;
}

/**
 * @param {DIContainer} container
 */
function configureClubModel(container) {
  return ClubModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureAreaModel(container) {
  return AreaModel.setup(container.get('Sequelize'));
}

/**
 * @param {DIContainer} container
 */
function configureSession(container) {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sequelize = container.get('SessionSequelize');
  const sessionOptions = {
    store: new SequelizeStore({ db: sequelize }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: ONE_WEEK_IN_SECONDS },
  };
  return session(sessionOptions);
}

function configureMulter() {
  const storage = multer.diskStorage({
    destination(req, file, cb) {
      cb(null, process.env.CRESTS_UPLOAD_DIR);
    },
    filename(req, file, cb) {
      // https://stackoverflow.com/questions/31592726/how-to-store-a-file-with-file-extension-with-multer
      // al tener una extensión, el navegador lo sirve en vez de descargarlo
      cb(null, Date.now() + path.extname(file.originalname));
    },
  });

  return multer({ storage });
}

/**
 * @param {DIContainer} container
 */
function addCommonDefinitions(container) {
  container.addDefinitions({
    Sequelize: factory(configureMainSequelizeDatabase),
    SessionSequelize: factory(configureSessionSequelizeDatabase),
    Session: factory(configureSession),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */
function addClubModuleDefinitions(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(
      get('Multer'),
      get('ClubService'),
      get('AreaService')
    ),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('ClubModel'), get('AreaModel')),
    ClubModel: factory(configureClubModel),
  });
}

/**
 * @param {DIContainer} container
 */
function addAreaModuleDefinitions(container) {
  container.addDefinitions({
    AreaController: object(AreaController).construct(get('AreaService')),
    AreaService: object(AreaService).construct(get('AreaRepository')),
    AreaRepository: object(AreaRepository).construct(get('AreaModel')),
    AreaModel: factory(configureAreaModel),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addAreaModuleDefinitions(container);
  addClubModuleDefinitions(container);
  setupSequelizeModelAssociations(container.get('ClubModel'), container.get('AreaModel'));
  return container;
};
