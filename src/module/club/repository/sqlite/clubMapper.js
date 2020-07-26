const Club = require('../../entity/club');

module.exports = {
  /**
   * @param {import('./clubModel')} model
   * @returns {import('../../entity/club')}
   */
  fromModelToEntity(model) {
    return new Club(model.toJSON());
  },
};
