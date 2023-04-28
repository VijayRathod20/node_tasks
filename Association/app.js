const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));

const userRouter = require("./routes/userRoutes");

app.use("/user", userRouter);
