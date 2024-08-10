const CinemaHall = require("../models/cinemaHall");



exports.createAllCinemaHalls = async (req, res) => {
    try {
        const { name, location, screen } = req.body;
        const newCinemaHall = await CinemaHall.create({
            name,
            location,
            screen
        });
        return res.status(200).json({ message: "successfull create newCinemaHall", newCinemaHall });
    } catch (err) {
        console.log(err);
        return res.status(400).json({ message: err.message });
    }
};

exports.getAllCinemaHalls = async (req, res) => {

    const name = req.query.name;
    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;
    let skip = (page - 1) * limit;

    try {
        const cinemaHalls = await CinemaHall.find({ name: new RegExp(name, 'i') })
            .skip(skip)
            .limit(limit)
            .populate({ path: "screen" });

        const totalCount = await CinemaHall.countDocuments({ name: new RegExp(name, 'i') });

        if (cinemaHalls.length === 0) {
            return res.status(404).json({ message: 'No CinemaHall found !!' });
        }

        return res.status(200).json({
            message: "cinemaHalls retrieved successfully!!",
            currentPage: page,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            cinemaHalls
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
