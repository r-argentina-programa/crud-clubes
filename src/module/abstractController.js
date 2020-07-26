const AbstractControllerError = require('./error/abstractControllerError');

module.exports = class AbstractController {
  constructor() {
    if (new.target === AbstractController) {
      throw new AbstractControllerError();
    }
  }
};
