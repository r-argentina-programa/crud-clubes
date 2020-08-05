const AbstractClubRepository = require('../abstractClubRepository');
const ClubNotFoundError = require('../error/clubNotFoundError');
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError');
const Club = require('../../entity/club');

module.exports = class ClubRepository extends AbstractClubRepository {
  /**
   * @param {import('uuid/v4')} uuid
   * @param {import('fs')} fileSystem
   * @param {String} dbFilePath
   */
  constructor(uuid, fileSystem, dbFilePath) {
    super();
    this.uuid = uuid;
    this.fileSystem = fileSystem;
    this.dbFilePath = dbFilePath;
  }

  /**
   * @param {import('../../entity/club')} club
   * @returns {Promise<import('../../entity/club')>}
   */
  async save(club) {
    const clubs = await this.getData();
    let clubToSave;

    if (club.id) {
      const clubIndex = clubs.findIndex((tmpClub) => tmpClub.id === club.id);
      if (clubIndex === -1) {
        throw new ClubNotFoundError(
          `No se pudo actualizar el club club con id ${club.id} porque no se encontró`
        );
      }

      const oldClub = clubs[clubIndex];
      clubs[clubIndex] = club;
      clubToSave = club;

      if (!club.crestUrl) {
        clubs[clubIndex].crestUrl = oldClub.crestUrl;
      }
    } else {
      clubToSave = { ...club, ...{ id: this.uuid() } };
      clubs.push(clubToSave);
    }

    this.saveData(clubs);
    return new Club(clubToSave);
  }

  /**
   * @param {import('../../entity/club')} club
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  async delete(club) {
    if (!club || !club.id) {
      throw new ClubIdNotDefinedError('El ID del club no está definido');
    }

    const clubs = this.getData();
    const clubIndex = clubs.findIndex((tmpClub) => tmpClub.id === club.id);
    clubs.splice(clubIndex, 1);

    this.saveData(clubs);

    return true;
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('../../entity/club')>}
   */
  async getById(id) {
    const clubs = this.getData();

    const club = clubs.find((tmpClub) => tmpClub.id === id);
    if (!club) {
      throw new ClubNotFoundError(`No se encontró club con id ${id}`);
    }

    return new Club(club);
  }

  /**
   * @return {Promise<Array<import('../../entity/club')>>}
   */
  async getAll() {
    return this.getData().map((clubData) => new Club(clubData));
  }

  /**
   * @returns {Array<import('../../entity/club')}
   */
  getData() {
    const content = this.fileSystem.readFileSync(this.dbFilePath, { encoding: 'utf-8' });
    let parsedContent;
    try {
      parsedContent = JSON.parse(content);
    } catch (e) {
      parsedContent = [];
    }
    return parsedContent;
  }

  saveData(content) {
    this.fileSystem.writeFileSync(this.dbFilePath, JSON.stringify(content));
  }
};
