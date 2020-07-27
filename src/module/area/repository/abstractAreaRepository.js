/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const AbstractAreaRepositoryError = require('./error/abstractAreaRepositoryError');

module.exports = class AbstractClubRepository {
  constructor() {
    if (new.target === AbstractClubRepository) {
      throw new AbstractAreaRepositoryError(
        'No se puede instanciar el repositorio de áreas abstracto.'
      );
    }
  }

  /**
   * @param {import('../entity/area')} area
   * @returns {Promise<import('../entity/area')>}
   */
  async save(club) {}

  /**
   * @param {Number} id
   */
  async delete(id) {}

  /**
   * @param {Number} id
   * @returns {Promise<import('../entity/area')>}
   */
  async getById(id) {}

  /**
   * @returns {Promise<Array<import('../entity/area')>>}
   */
  async getAll() {}
};
