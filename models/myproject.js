"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Myproject extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Myproject.belongsTo(models.User, {
        foreignKey: "user_id",
        as: "user",
        onDelete: "SET NULL",
        onUpdate: "CASCADE",
      });
    }
  }
  Myproject.init(
    {
      projectname: DataTypes.STRING,
      startdate: DataTypes.DATEONLY,
      enddate: DataTypes.DATEONLY,
      description: DataTypes.TEXT,
      technologiesA: DataTypes.STRING,
      technologiesB: DataTypes.STRING,
      technologiesC: DataTypes.STRING,
      technologiesD: DataTypes.STRING,
      image: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Myproject",
    }
  );
  return Myproject;
};
