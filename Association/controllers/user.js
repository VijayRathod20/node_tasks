const model = require("../models");
const userModel = model.users;
const profileModel = model.profile;
const courseModel = model.courses;
const userCourseModel = model.userCourses;
const { Op } = require("sequelize");
const faker = require("faker");

userModel.hasOne(profileModel);
profileModel.belongsTo(userModel);
userModel.hasMany(courseModel);
courseModel.belongsTo(userModel);
// userModel.belongsToMany(courseModel, {
//   through: userCourseModel,
// });
// courseModel.belongsToMany(userModel, {
//   through: userCourseModel,
// });

const user = async (req, res) => {
  // const data = await userModel.findAll({
  //   include: courseModel,
  // });
  // var uid = 32;
  // uid = uid++;
  // const data1 = await userModel.create(
  //   {
  //     name: "test1",
  //     email: "test1@gmail.com",
  //     courses: [
  //       {
  //         name: "node",
  //         userId: uid,
  //         userCourses: {},
  //       },
  //     ],
  //   },
  //   {
  //     include: courseModel,
  //   }
  // );
  // res.send(data1);
  // const data = [
  //   {
  //     name: "node",
  //     userId: 1,
  //   },
  //   {
  //     name: "php",
  //     userId: 1,
  //   },
  //   {
  //     name: "java",
  //     userId: 1,
  //   },
  //   {
  //     name: "node",
  //     userId: 2,
  //   },
  //   {
  //     name: "java",
  //     userId: 2,
  //   },
  //   {
  //     name: "python",
  //     userId: 2,
  //   },
  //   {
  //     name: "java",
  //     userId: 3,
  //   },
  //   {
  //     name: "python",
  //     userId: 2,
  //   },
  // ];
  // const coursesData = await courseModel.bulkCreate(data);
  // const data = await profileModel.findAll({ include: userModel });
  // const data = await userModel.findAll({
  //     include: {
  //         model:profileModel
  //     }
  // })
  // res.send(data);
  //   const data = [
  //     {
  //       userId: 1,
  //       city: "mahuva",
  //       mobile: 5645876,
  //     },
  //     {
  //       userId: 2,
  //       city: "ahmedabad",
  //       mobile: 74654657,
  //     },
  //     {
  //       userId: 3,
  //       city: "surat",
  //       mobile: 43546711,
  //     },
  //   ];
  //   const data2 = [
  //     {
  //       name: "abc",
  //       email: "abc@gmail.com",
  //     },
  //     {
  //       name: "xyz",
  //       email: "xyz@gmail.com",
  //     },
  //     {
  //       name: "pqr",
  //       email: "pqr@gmail.com",
  //     },
  //   ];
  //   const userData = await userModel.bulkCreate(data2);
  // const profileData = await profileModel.bulkCreate(data);
  //   const data = await userModel.create({
  //     name: "test",
  //     email: "test@gmail.com",
  //   });
  //   if (data && data.id) {
  //     console.log(data.id);
  //     const profile = await profileModel.create({
  //       userId: data.id,
  //       city: "mahuva",
  //       mobile: 46548,
  //     });
  //   }
  //   const profile = await profileModel.bulkCreate(data);
  //   const user = await userModel.findOne({
  //       where: {
  //           id:1
  //       },
  //       include:[profileModel]
  //   })
  //   res.send(user);
  // for (let i = 0; i < 10; i++) {
  //   userModel.create(
  //     {
  //       name: Math.random().toString(36).substring(2, 7),
  //       email: Math.random().toString(36).substring(2, 7) + "gmail.com",
  //       phoneNo: Math.floor(100000000 + Math.random() * 900000000),
  //       courses: [
  //         {
  //           name: Math.random().toString(36).substring(2, 7),
  //         },
  //       ],
  //     },
  //     {
  //       include: [courseModel],
  //     }
  //   );
  // }
};

const getData = async (req, res, next) => {
  const draw = req.query.draw;
  const start = req.query.start;
  const length = req.query.length;
  var order = req.query.order;
  const search = req.query.search;
  const searchValue = search.value;

  const recordsTotal = await userModel.count();
  const recordsFiltered = recordsTotal;

  console.log("draw", draw);
  console.log("start", start);
  console.log("length", length);
  console.log("order", order);
  console.log("search", search);
  console.log("searchValue", searchValue);

  if (order) {
    var column = order[0].column;
    var dir = order[0].dir;
    var colName = req.query.columns[column].data;
    var orderBy = [[colName, dir]];
  } else {
    var orderBy = ["id"];
  }

   if (column == 4) {
     var orderBy = [[courseModel, "name", dir]];
   }

  // if (searchValue.length > 0) {
  //   var where = {
  //     [Op.or]: [
  //       {
  //         name: {
  //           [Op.like]: "%" + searchValue + "%",
  //         },
  //         email: {
  //           [Op.like]: "%" + searchValue + "%",
  //         },
  //       },
  //     ],
  //   };
  // } else {
  //   var where = {};
  // }

  const data = await userModel.findAll({
    offset: parseInt(start),
    limit: parseInt(length),
    order: orderBy,
    where: {
      [Op.or]: {
        name: {
          [Op.like]: `${searchValue}%`,
        },
        email: {
          [Op.like]: `${searchValue}%`,
        },
      },
    },
    include: [courseModel],
  });
  // const data2 =await userModel.findAll({
  // include:courseModel
  // })
  // console.log(data2);
  res.json({
    draw: parseInt(draw),
    data: data,
    recordsTotal: recordsTotal,
    recordsFiltered: recordsFiltered,
  });
};

const dataTable = async (req, res) => {
  res.render("data_table");
};

module.exports = { user, getData, dataTable };
