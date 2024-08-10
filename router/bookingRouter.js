const express = require('express');
const router = express.Router();
const bookingController=require("../controller/bookingController");

router.post("/createBooking",bookingController.createBooking);
router.get("/bookingData",bookingController.getBookingData);

router.get("/getContacts",bookingController.getContacts);
router.get("/bookingSearch",bookingController.bookingSearch);
module.exports = router;
