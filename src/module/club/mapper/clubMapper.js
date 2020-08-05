const Club = require('../entity/club');

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
}) {
  return new Club({
    id,
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
  });
}

module.exports = {
  fromDataToEntity,
};
