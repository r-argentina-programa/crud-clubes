const { fromModelToEntity } = require('./clubMapper');
const AbstractClubRepository = require('../abstractClubRepository');
const ClubNotFoundError = require('../error/clubNotFoundError');
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError');

module.exports = class ClubRepository extends AbstractClubRepository {
  /**
   * @param {typeof import('./clubModel')} clubModel
   */
  constructor(clubModel) {
    super();
    this.clubModel = clubModel;
  }

  /**
   * @param {import('../../entity/club')} club
   * @returns {Promise<import('../../entity/club')>}
   */
  async save(club) {
    let clubModel;
    if (!club.id) {
      clubModel = await this.clubModel.create(club);
    } else {
      clubModel = await this.clubModel.build(club, { isNewRecord: false }).save();
    }
    return fromModelToEntity(clubModel);
  }

  /**
   * @param {import('../../entity/club')} club
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  async delete(club) {
    if (!club || !club.id) {
      throw new ClubIdNotDefinedError();
    }

    return Boolean(await this.clubModel.destroy({ where: { id: club.id } }));
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('../../entity/club')>}
   */
  async getById(id) {
    const clubModel = await this.clubModel.findOne({ where: { id } });

    if (!clubModel) {
      throw new ClubNotFoundError(`No se encontró club con id ${id}`);
    }

    return fromModelToEntity(clubModel);
  }

  /**
   * @return {Promise<Array<import('../../entity/club')>>}
   */
  async getAll() {
    const clubs = await this.clubModel.findAll();
    return clubs.map(fromModelToEntity);
  }
};
