const express = require("express");
const router = express.Router();
const userController = require("../controllers/user");

router.get("/", userController.user);

router.get("/get_data", userController.getData);

router.get("/data-table", userController.dataTable);

module.exports = router;
