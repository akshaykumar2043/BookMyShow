const ShowTiming = require("../models/showTiming");
const Movie = require("../models/movie");
const CinemaHall = require("../models/cinemaHall");



exports.createShowTime = async (req, res) => {
    try {
        const { movie, cinemaHall, dateTime, availableSeats } = req.body;

        //movie check
        const movies = await Movie.findById(movie)
        if (!movies) { return res.status(404).json({ message: "movie not found!!" }) }

        //cinemaHall check
        const cinemaHalls = await CinemaHall.findById(cinemaHall)
        if (!cinemaHalls) { return res.status(404).json({ message: "cinemaHalls not found!!" }) }

        const newShowTiming = await ShowTiming.create({
            movie: movies,
            cinemaHall: cinemaHalls,
            dateTime,
            availableSeats
        });
        return res.status(201).json({ message: "successfull new created showtiming ", newShowTiming });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.historyShowTime = async (req, res) => {
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    try {
        const showTiming = await ShowTiming.find()
            .skip(skip)
            .limit(limit)
            .populate([{ path: "movie" }, { path: "cinemaHall" }]);

        const totalCount = await ShowTiming.countDocuments();
        if (showTiming.length === 0) {
            return res.status(404).json({ message: 'No ShowTiming found !!' });
        }
        return res.status(200).json({
            message: "ShowTiming retrieved successfully!!",
            currentPage: page,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            showTiming
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

exports.historyShowTimeByDate = async (req, res) => {

    const now =Date.now();

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;
    try {
        const showTiming = await ShowTiming.find({
            dateTime: { $gt: now } 
        })
            .skip(skip)
            .limit(limit)
            .populate([{ path: "movie" }, { path: "cinemaHall" }]);
            console.log(showTiming);

        const totalCount = await ShowTiming.countDocuments({  dateTime: { $gt: now } });
        if (showTiming.length === 0) {
            return res.status(404).json({ message: 'No ShowTiming found !!' });
        }
        return res.status(200).json({
            message: "ShowTiming retrieved successfully!!",
            currentPage: page,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            showTiming
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: error.message });
    }
}


