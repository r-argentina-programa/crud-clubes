const { Sequelize, Model, DataTypes } = require('sequelize');

module.exports = class ClubModel extends Model {
  /**
   * @param {import('sequelize').Sequelize} sequelizeInstance
   * @returns {typeof ClubModel}
   */
  static setup(sequelizeInstance) {
    ClubModel.init(
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
        shortName: {
          type: DataTypes.STRING,
        },
        tla: {
          type: DataTypes.STRING,
        },
        crestUrl: {
          type: DataTypes.STRING,
        },
        address: {
          type: DataTypes.STRING,
        },
        phone: {
          type: DataTypes.STRING,
        },
        website: {
          type: DataTypes.STRING,
        },
        email: {
          type: DataTypes.STRING,
        },
        founded: {
          type: DataTypes.INTEGER,
        },
        clubColors: {
          type: DataTypes.STRING,
        },
        venue: {
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
        modelName: 'Club',
        timestamps: false,
      }
    );
    return ClubModel;
  }
};
