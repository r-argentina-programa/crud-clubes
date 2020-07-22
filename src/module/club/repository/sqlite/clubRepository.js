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
    let clubModel;
    if (!club.id) {
      clubModel = await this.clubModel.create(club);
    } else {
      clubModel = await this.clubModel.build(club).update();
    }
    return fromModelToEntity(clubModel);
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
