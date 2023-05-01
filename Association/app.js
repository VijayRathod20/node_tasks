const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const ejs = require("ejs");
app.set("view engine", "ejs");

const userRouter = require("./routes/userRoutes");

app.use(userRouter);
