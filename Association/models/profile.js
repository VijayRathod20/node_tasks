'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class profile extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  profile.init({
    userId: {
      type: DataTypes.STRING,
      references: {
        model: 'users',
        key:'id'
      }

    },
    city: DataTypes.STRING,
    mobile: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'profile',
  });
  profile.associate((models) => {
    profile.belongsTo(models.users);
  });
  return profile;
};