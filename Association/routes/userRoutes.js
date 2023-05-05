const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");
const validator = require("../middleware/validator");

router.get("/", userController.user);

router.get("/get_data", userController.getData);

router.get("/data-table", userController.dataTable);

router.get("/get", userController.get);

router.get("/get/:id", userController.getOne);

router.post("/user", validator, userController.postUser);

module.exports = router;
