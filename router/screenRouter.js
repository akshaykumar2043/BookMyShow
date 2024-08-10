const express = require('express');
const router = express.Router();
const screenController=require("../controller/screenController");



router.post("/createScreen",screenController.createScreen);
router.get("/historyScreen",screenController.allScreen);
module.exports = router;
