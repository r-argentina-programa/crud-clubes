const { fromModelToEntity } = require('./areaMapper');
const AbstractAreaRepository = require('../abstractAreaRepository');
const AreaNotFoundError = require('../error/areaNotFoundError');
const AreaIdNotDefinedError = require('../error/areaIdNotDefinedError');

module.exports = class AreaRepository extends AbstractAreaRepository {
  /**
   * @param {typeof import('./areaModel')} areaModel
   */
  constructor(areaModel) {
    super();
    this.areaModel = areaModel;
  }

  /**
   * @param {import('../../entity/area')} area
   * @returns {Promise<import('../../entity/area')>}
   */
  async save(area) {
    let areaModel;
    if (!area.id) {
      areaModel = await this.areaModel.create(area);
    } else {
      areaModel = await this.areaModel.build(area, { isNewRecord: false }).save();
    }
    return fromModelToEntity(areaModel);
  }

  /**
   * @param {import('../../entity/area')} area
   * @returns {Boolean} devuelve true si se borró algo, false si no se borró nada.
   */
  async delete(area) {
    if (!area || !area.id) {
      throw new AreaIdNotDefinedError();
    }

    return Boolean(await this.areaModel.destroy({ where: { id: area.id } }));
  }

  /**
   * @param {Number} id
   * @returns {Promise<import('../../entity/area')>}
   */
  async getById(id) {
    const areaModel = await this.areaModel.findOne({ where: { id } });

    if (!areaModel) {
      throw new AreaNotFoundError(`No se encontró área con id ${id}`);
    }

    return fromModelToEntity(areaModel);
  }

  /**
   * @return {Promise<Array<import('../../entity/area')>>}
   */
  async getAll() {
    const areas = await this.areaModel.findAll();
    return areas.map(fromModelToEntity);
  }
};
