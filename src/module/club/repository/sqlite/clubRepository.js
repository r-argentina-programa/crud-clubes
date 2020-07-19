const { fromModelToEntity } = require('./clubMapper');

module.exports = class ClubRepository {
  /**
   * @param {typeof import('./clubModel')} clubModel
   */
  constructor(clubModel) {
    this.clubModel = clubModel;
  }

  /**
   * @param {import('../../entity/club')} club
   */
  async save(club) {
    return this.clubModel.create(club);
  }

  async delete() {}

  async get() {}

  /**
   * @return {Promise<Array<import('../../entity/club')>>}
   */
  async getAll() {
    const clubs = await this.clubModel.findAll();
    return clubs.map(fromModelToEntity);
  }
};
