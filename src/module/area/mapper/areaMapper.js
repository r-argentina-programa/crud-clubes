const Area = require('../entity/area');

module.exports = function fromDataToEntity({ id, name }) {
  return new Area({ id, name });
};
