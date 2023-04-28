const express = require("express");
const app = express();
const port = 3000;
const model = require("./models");

const student = model.student;
const courses = model.courses;
const studentCourse = model.student_courses;

const userRoutes = require("./routes/users.js");

app.get("/", async (req, res) => {
  //     const data = [
  //       {
  //         name: "php",
  //         studentId: 3,
  //       },
  //       {
  //         name: "php",
  //         studentId: 5,
  //       },
  //       {
  //         name: "node",
  //         studentId: 1,
  //       },
  //       {
  //         name: "node",
  //         studentId: 2,
  //       },
  //       {
  //         name: "java",
  //         studentId: 1,
  //       },
  //     ];
  //   const course = await courses.bulkCreate(data);
  //   res.send(course);
    student.belongsToMany(courses, { through:studentCourse });

    const std = await student.findOne({ include: courses });

    res.send(std)
    
  // This creates a junction table `foo_bar` with fields `fooId` and `barId`
});

app.use("/user", userRoutes);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
