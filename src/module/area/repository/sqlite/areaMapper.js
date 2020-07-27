const Area = require('../../entity/area');

module.exports = {
  /**
   * @param {import('./areaModel')} model
   * @returns {import('../../entity/area')}
   */
  fromModelToEntity(model) {
    return new Area(model.toJSON());
  },
};
