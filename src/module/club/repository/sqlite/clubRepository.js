const AbstractClubRepository = require('../abstractClubRepository');
const ClubNotFoundError = require('../error/clubNotFoundError');
const ClubIdNotDefinedError = require('../error/clubIdNotDefinedError');
const { fromDbToEntity } = require('../../mapper/clubMapper');

module.exports = class ClubRepository extends AbstractClubRepository {
  /**
   * @param {import('better-sqlite3').Database} databaseAdapter
   */
  constructor(databaseAdapter) {
    super();
    this.databaseAdapter = databaseAdapter;
  }

  /**
   * @param {import('../../entity/club')} club
   * @returns {import('../../entity/club')}
   */
  save(club) {
    let id;
    if (club.id) {
      id = club.id;
      const statement = this.databaseAdapter.prepare(`
        UPDATE clubes SET
          ${club.crestUrl ? `crest_url = ?,` : ''}
          name = ?,
          short_name = ?,
          tla = ?,
          address = ?,
          phone = ?,
          website = ?,
          email = ?,
          founded = ?,
          club_colors = ?,
          venue = ?
        WHERE id = ?
      `);

      const params = [
        club.name,
        club.shortName,
        club.tla,
        club.address,
        club.phone,
        club.website,
        club.email,
        club.founded,
        club.clubColors,
        club.venue,
        club.id,
      ];

      if (club.crestUrl) {
        params.unshift(club.crestUrl);
      }

      statement.run(params);
    } else {
      const statement = this.databaseAdapter.prepare(`
        INSERT INTO clubes(
          name,
          short_name,
          tla,
          crest_url,
          address,
          phone,
          website,
          email,
          founded,
          club_colors,
          venue
        ) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `);

      const result = statement.run(
        club.name,
        club.shortName,
        club.tla,
        club.crestUrl,
        club.address,
        club.phone,
        club.website,
        club.email,
        club.founded,
        club.clubColors,
        club.venue
      );

      id = result.lastInsertRowid;
    }

    return this.getById(id);
  }

  /**
   * @param {import('../../entity/club')} club
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  delete(club) {
    if (!club || !club.id) {
      throw new ClubIdNotDefinedError('El ID del club no está definido');
    }

    this.databaseAdapter.prepare('DELETE FROM clubes WHERE id = ?').run(club.id);

    return true;
  }

  /**
   * @param {Number} id
   * @returns {import('../../entity/club')}
   */
  getById(id) {
    const club = this.databaseAdapter
      .prepare(
        `SELECT
          id,
          name,
          short_name,
          tla,
          crest_url,
          address,
          phone,
          website,
          email,
          founded,
          club_colors,
          venue
          FROM clubes wHERE id = ?`
      )
      .get(id);

    if (club === undefined) {
      throw new ClubNotFoundError(`No se encontró el club con ID: ${id}`);
    }

    return fromDbToEntity(club);
  }

  /**
   * @return {Array<import('../../entity/club')>}
   */
  getAll() {
    const clubes = this.databaseAdapter
      .prepare(
        `SELECT
          id,
          name,
          short_name,
          tla,
          crest_url,
          address,
          phone,
          website,
          email,
          founded,
          club_colors,
          venue
        FROM clubes`
      )
      .all();
    return clubes.map((clubData) => fromDbToEntity(clubData));
  }
};
