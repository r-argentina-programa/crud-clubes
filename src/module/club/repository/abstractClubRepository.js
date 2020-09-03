/* eslint-disable no-empty-function */
/* eslint-disable no-unused-vars */
const AbstractClubRepositoryError = require('./error/abstractClubRepositoryError');
const MethodNotImplementedError = require('./error/methodNotImplementedError');

module.exports = class AbstractClubRepository {
  constructor() {
    if (new.target === AbstractClubRepository) {
      throw new AbstractClubRepositoryError(
        'No se puede instanciar el repositorio de clubes abstracto.'
      );
    }
  }

  /**
   * @param {import('../entity/club')} club
   * @returns {import('../entity/club')}
   */
  async save(club) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   */
  async delete(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @param {Number} id
   * @returns {import('../entity/club')}
   */
  async getById(id) {
    throw new MethodNotImplementedError();
  }

  /**
   * @returns {Array<import('../entity/club')>}
   */
  async getAll() {
    throw new MethodNotImplementedError();
  }
};
