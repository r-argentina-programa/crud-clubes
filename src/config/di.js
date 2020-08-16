// configure DI container
const path = require('path');
const { default: DIContainer, object, get, factory } = require('rsdi');
const multer = require('multer');
const Sqlite3Database = require('better-sqlite3');

const session = require('express-session');
const { ClubController, ClubService, ClubRepository } = require('../module/club/module');

function configureMainDatabaseAdapter() {
  return new Sqlite3Database(process.env.DB_PATH, {
    verbose: console.log,
  });
}

function configureSession() {
  const ONE_WEEK_IN_SECONDS = 604800000;

  const sessionOptions = {
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
    MainDatabaseAdapter: factory(configureMainDatabaseAdapter),
    Session: factory(configureSession),
    Multer: factory(configureMulter),
  });
}

/**
 * @param {DIContainer} container
 */
function addClubModuleDefinitions(container) {
  container.addDefinitions({
    ClubController: object(ClubController).construct(get('Multer'), get('ClubService')),
    ClubService: object(ClubService).construct(get('ClubRepository')),
    ClubRepository: object(ClubRepository).construct(get('MainDatabaseAdapter')),
  });
}

module.exports = function configureDI() {
  const container = new DIContainer();
  addCommonDefinitions(container);
  addClubModuleDefinitions(container);
  return container;
};
