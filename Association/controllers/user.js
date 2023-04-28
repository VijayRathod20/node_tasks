const model = require("../models");
const userModel = model.users;
const profileModel = model.profile;
const courseModel = model.courses;
const userCourseModel = model.userCourses;

const user = async (req, res) => {
  userModel.hasOne(profileModel);
  profileModel.belongsTo(userModel);
  userModel.hasMany(courseModel);
  courseModel.belongsTo(userModel);
  userModel.belongsToMany(courseModel, {
    through: userCourseModel,
  });
  courseModel.belongsToMany(userModel, {
    through: userCourseModel,
  });

  // const data = await userModel.findAll({
  //   include: courseModel,
  // });

  const data1 = await userModel.create(
    {
      name: "test1",
      email: "test1@gmail.com",
      courses: [
        {
          name: "node",
          userId: 7,
          userCourses: {},
        },
      ],
    },
    {
      include: courseModel,
    }
  );
  res.send(data1);

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
};

module.exports = { user };
