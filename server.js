const express = require("express");
const bodyParser = require('body-parser');

const app = express();
const env = require("dotenv");

const cinemaRouter=require("./router/cinemaHallRouter");
const movieRouter=require("./router/movieRouter");
const screenRouter=require("./router/screenRouter");
const showTimingRouter=require("./router/showTimmingRouter");
const bookingRouter=require("./router/bookingRouter")
env.config();

const Port = process.env.PORT;

// app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());


app.use("/api",cinemaRouter);
app.use("/api",movieRouter);
app.use("/api",screenRouter);
app.use("/api",showTimingRouter);
app.use("/api",bookingRouter);

require("./db/connection");
app.listen(Port, () => console.log(`server started at PORT:${Port}`));