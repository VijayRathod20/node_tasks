"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class userCourses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  userCourses.init(
    {
      selfGranted: {
        type: DataTypes.BOOLEAN,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
      },
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "courses",
          key: "id",
        },
      },
    },
    {
      sequelize,
      modelName: "userCourses",
    }
  );
  return userCourses;
};
