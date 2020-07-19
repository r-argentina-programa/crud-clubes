/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const AbstractRepositoryError = require('./error/abstractRepositoryError');

module.exports = class AbstractClubRepository {
  constructor() {
    throw new AbstractRepositoryError('No se puede instanciar el repositorio de clubes abstracto.');
  }

  /**
   * @param {import('../entity/club')} club
   * @returns {import('../entity/club')}
   */
  async save(club) {}

  /**
   * @param {Number} id
   */
  async delete(id) {}

  /**
   * @param {Number} id
   * @returns {import('../entity/club')}
   */
  async get(id) {}

  /**
   * @returns {Array<import('../entity/club')>}
   */
  async getAll() {}
};
