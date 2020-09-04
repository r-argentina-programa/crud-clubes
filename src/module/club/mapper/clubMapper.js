// map from Controller to Entity
// map from Entity to Controller
// map from Entity to Model
// map from Model to Entity

const Club = require('../entity/club');
const Area = require('../../area/entity/area');

/**
 *
 * @param {Object} formData
 * @returns Club
 */
function fromDataToEntity({
  id,
  name,
  'short-name': shortName,
  tla,
  'crest-url': crestUrl,
  address,
  phone,
  website,
  email,
  founded,
  'club-colors': clubColors,
  venue,
  // eslint-disable-next-line camelcase
  area_id,
}) {
  return new Club({
    id: Number(id),
    name,
    shortName,
    tla,
    crestUrl,
    address,
    phone,
    website,
    email,
    founded,
    clubColors,
    venue,
    Area: new Area({ id: Number(area_id) }),
  });
}

/**
 * @param {import('./clubModel')} model
 * @returns {import('../../entity/club')}
 */
function fromModelToEntity(model) {
  return new Club(model.toJSON());
}

module.exports = {
  fromDataToEntity,
  fromModelToEntity,
};
