const express = require('express');
const router = express.Router();
const movieController = require("../controller/movieController");
const multer = require("multer");
const fs = require("fs");


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, res, cb) => {
            const directory = "uploads/movie";
            if (!fs.existsSync(directory)) {
                fs.mkdirSync(directory)
            }
            cb(null, directory);
        },
        filename: function (req, file, cb) {
            const exitArray = file.originalname.split(".")
            const extension = exitArray[exitArray.length - 1];
            cb(null, Date.now() + "_movie." + extension);
        }
    })
}).fields([
    { name: "movieImage", minCount: 1 }
])

router.post("/movieController",upload, movieController.createMovie);
router.get("/getMovieByTitle",movieController.getMovieByTitle);


module.exports = router;
