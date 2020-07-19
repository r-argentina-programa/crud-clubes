const Club = require('../../entity/club');
/**
 * @param {import('./clubModel')} model
 * @returns {import('../../entity/club')}
 */
module.exports = {
  fromModelToEntity(model) {
    return new Club(model.toJSON());
  },
};
