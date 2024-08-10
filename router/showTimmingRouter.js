const express = require('express');
const router = express.Router();



const showTimmingController=require("../controller/showTimmingController");



router.post("/createShowTime",showTimmingController.createShowTime);
router.get("/historyShowTime",showTimmingController.historyShowTime);
router.get("/historyShowTimeByDate",showTimmingController.historyShowTimeByDate)
module.exports = router;