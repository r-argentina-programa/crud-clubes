const Area = require('../entity/area');

/**
 * @param {import('./areaModel')} model
 * @returns {import('../../entity/area')}
 */
function fromModelToEntity(model) {
  return new Area(model.toJSON());
}

function fromDataToEntity({ id, name }) {
  return new Area({ id, name });
}

module.exports = {
  fromModelToEntity,
  fromDataToEntity,
};
