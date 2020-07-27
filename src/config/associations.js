/**
 * @param {import('sequelize').Sequelize} sequelizeInstance
 */
module.exports = async function setupAssociations(ClubModel, AreaModel) {
  ClubModel.belongsTo(AreaModel, { foreignKey: 'area_id' });
};
