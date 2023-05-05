const express = require("express");
const app = express();
const port = 3000;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
const ejs = require("ejs");
app.set("view engine", "ejs");
const bodyParser = require("body-parser");
app.use(bodyParser.json({ extended: false }));

//swagger
const swaggerUI = require("swagger-ui-express");
const YAML = require("yamljs");
const swaggerJsDocs = YAML.load("./apidocs.yaml");

app.use("/test", swaggerUI.serve, swaggerUI.setup(swaggerJsDocs));

const userRouter = require("./routes/userRoutes");

app.use(userRouter);
