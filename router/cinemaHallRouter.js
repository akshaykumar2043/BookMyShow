const express = require('express');
const router = express.Router();
const cinemaHallController=require("../controller/cinemaHallController");


router.get("/getAllCinemaHalls",cinemaHallController.getAllCinemaHalls);
router.post("/createCinema",cinemaHallController.createAllCinemaHalls);

module.exports = router;
