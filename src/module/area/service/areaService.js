/**
 * @typedef {import('../repository/abstractAreaRepository')} AbstractAreaRepository
 */

const AreaNotDefinedError = require('./error/areaNotDefinedError');
const AreaIdNotDefinedError = require('./error/areaIdNotDefinedError');
const Area = require('../entity/area');

module.exports = class Service {
  /**
   *
   * @param {AbstractAreaRepository} areaRepository
   */
  constructor(areaRepository) {
    this.areaRepository = areaRepository;
  }

  /**
   * @param {Area} area
   */
  async save(area) {
    if (area === undefined) {
      throw new AreaNotDefinedError();
    }

    return this.areaRepository.save(area);
  }

  /**
   * @param {Area} area
   */
  async delete(area) {
    if (!(area instanceof Area)) {
      throw new AreaNotDefinedError();
    }

    return this.areaRepository.delete(area);
  }

  async getById(id) {
    if (id === undefined) {
      throw new AreaIdNotDefinedError();
    }

    return this.areaRepository.getById(id);
  }

  async getAll() {
    return this.areaRepository.getAll();
  }
};
