const express = require("express");
const app = express();
const port = 3001;
const mysql = require("mysql2");
const db = require("./models");
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
const { Op } = require("sequelize");

const { User } = require("./models");
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

db.sequelize.sync().then(() => {
  console.log("sequelize");
});

const data = [
  {
    firstName: "vijay",
    lastName: "rathod",
    email: "vijayrathod@gmail.com",
  },
  {
    firstName: "manthan",
    lastName: "patel",
    email: "manthanpatel@gmail.com",
  },
  {
    firstName: "harshil",
    lastName: "lathiya",
    email: "harshillathiya@gmail.com",
  },
];
// const insert = User.bulkCreate(data);

app.get("/select", async (req, res) => {
  const users = await User.findAll();
  if (users.length > 0) {
    res.json(users);
  } else {
    res.send("no user found");
  }
});

app.get("/selectOne/:id", async (req, res) => {
  const users = await User.findOne({
    where: {
      id: req.params.id,
    },
  });
  if (users != null) {
    res.json(users);
  } else {
    res.send("no user found");
  }
});

app.post("/insert", async (req, res) => {
  var data = req.body;
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const email = req.body.email;
  console.log(data);
  if (data.length > 1) {
    for (let i = 0; i < data.length; i++) {
      var insert = await User.create({
        firstName: `${data[i].firstName}`,
        lastName: `${data[i].lastName}`,
        email: `${data[i].email}`,
      });
    }
    if (insert) {
      res.send("data inserted");
    }
  } else {
    var insertOne = await User.create(data);
    if (insertOne) {
      res.send("inserted!");
    } else {
      res.send("err while inserting");
    }
  }
});

app.delete("/delete?", async (req, res) => {
  const id = req.query.id;
  const delUser = await User.destroy({ where: { id: id } });
  if (delUser) {
    res.send("deleted");
  } else {
    res.send("err");
  }
});

app.put("/update/:id", async (req, res) => {
  const updateData = req.body;
  const id = req.params.id;
  const update = await User.update(updateData, {
    where: {
      id: id,
    },
  });
  console.log(update);
  if (update == 1) {
    res.send("updated");
  } else {
    res.send("error while updating");
  }
});

app.get("/pagination?", async (req, res) => {
  const page = req.query.page;
  const limit = 2;
  const offset = (page - 1) * limit;

  console.log(offset);
  const { count, rows } = await User.findAndCountAll({
    offset: offset,
    limit: limit,
  });
  console.log(count);
  console.log(rows);
  res.json(rows);
});

app.get("/search?", async (req, res) => {
  const searchValue = req.query.search.trim();
  const find = await User.findAll({
    where: {
      [Op.or]: {
        firstName: { [Op.like]: `%${searchValue}%` },
        lastName: { [Op.like]: `%${searchValue}%` },
        email: { [Op.like]: `%${searchValue}%` },
      },
    },
  });
  console.log(find.length);
  if (find.length > 0) {
    res.status(200).json(find);
  } else {
    res.send("No Data Found!");
  }
});

app.get("/multiSearch?", async (req, res) => {
  const searchValue = req.query.search;
  console.log(searchValue);
  const arr = searchValue.split(" ");
  const firstName = arr[0];
  const lastName = arr[1];
  console.log(arr);

  const find = await User.findAll({
    where: {
      [Op.or]: {
        firstName: { [Op.like]: `%${firstName}%` },
        lastName: { [Op.like]: `%${lastName}%` },
      },
    },
  });
  if (find.length > 0) {
    res.status(200).json(find);
  } else {
    res.send("No Data Found!");
  }
});

app.get("/sort?", async (req, res) => {
  const sortOrder = req.query.sortOrder;
  const sortBy = req.query.sortBy;
  const find = await User.findAll({
    order: [[`${sortBy}`, `${sortOrder}`]],
  });
  console.log(find);
  res.json(find);
});
