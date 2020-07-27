/**
 * @typedef {import('../repository/abstractClubRepository')} AbstractClubRepository
 */

const ClubNotDefinedError = require('./error/clubNotDefinedError');
const ClubIdNotDefinedError = require('./error/clubIdNotDefinedError');
const Club = require('../entity/club');

module.exports = class Service {
  /**
   *
   * @param {AbstractClubRepository} clubRepository
   */
  constructor(clubRepository) {
    this.clubRepository = clubRepository;
  }

  /**
   * @param {Club} club
   */
  async save(club) {
    if (club === undefined) {
      throw new ClubNotDefinedError();
    }

    return this.clubRepository.save(club);
  }

  /**
   * @param {Club} club
   */
  async delete(club) {
    if (!(club instanceof Club)) {
      throw new ClubNotDefinedError();
    }

    return this.clubRepository.delete(club);
  }

  async getById(id) {
    if (id === undefined) {
      throw new ClubIdNotDefinedError();
    }

    return this.clubRepository.getById(id);
  }

  async getAll() {
    return this.clubRepository.getAll();
  }
};
