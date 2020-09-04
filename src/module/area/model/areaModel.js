const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class AreaModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof AreaModel}
   */
  static setup(sequelizeInstance) {
    AreaModel.init(
      {
        id: {
          type: DataTypes.INTEGER,
          allowNull: false,
          primaryKey: true,
          autoIncrement: true,
          unique: true,
        },
        name: {
          type: DataTypes.STRING,
        },
        lastUpdated: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
        createdAt: {
          type: DataTypes.DATE,
          defaultValue: Sequelize.NOW,
        },
      },
      {
        sequelize: sequelizeInstance,
        modelName: 'Area',
        timestamps: false,
      }
    );
    return AreaModel;
  }
};
