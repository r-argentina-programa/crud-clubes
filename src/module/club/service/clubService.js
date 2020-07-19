/**
 * @typedef {import('../repository/abstractClubRepository')} AbstractClubRepository
 */

const ClubNotDefinedError = require('./exception/clubNotDefinedError');
const IdNotDefinedError = require('./exception/idNotDefinedError');

module.exports = class Service {
  /**
   *
   * @param {AbstractClubRepository} clubRepository
   */
  constructor(clubRepository) {
    this.clubRepository = clubRepository;
  }

  async save(team) {
    if (team === undefined) {
      throw new ClubNotDefinedError();
    }

    return this.clubRepository.save(team);
  }

  async delete(team) {
    if (team === undefined) {
      throw new ClubNotDefinedError();
    }

    return this.clubRepository.delete(team);
  }

  async getById(id) {
    if (id === undefined) {
      throw new IdNotDefinedError();
    }

    return this.clubRepository.get(id);
  }

  async getAll() {
    return this.clubRepository.getAll();
  }
};
