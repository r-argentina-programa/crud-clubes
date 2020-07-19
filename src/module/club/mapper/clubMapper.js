// map from Controller to Entity
// map from Entity to Controller
// map from Entity to Model
// map from Model to Entity

const Club = require('../entity/club');

module.exports = {
  /**
   *
   * @param {Object} formData
   * @returns Club
   */
  formDataToEntity({
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
  },
};
