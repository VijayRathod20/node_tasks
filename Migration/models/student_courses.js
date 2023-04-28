'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class student_courses extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  student_courses.init({
    studentId: DataTypes.INTEGER,
    courseId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'student_courses',
  });
  return student_courses;
};