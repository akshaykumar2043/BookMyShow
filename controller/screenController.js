const Screen = require('../models/screen');
exports.createScreen = async (req, res) => {
    try {
        const { screenNumber, seatingCapacity } = req.body;
        const screen = await Screen.create({
            screenNumber,
            seatingCapacity,
        });
        return res.status(200).json({ message: "Successfully created screen", screen });
    } catch (err) {
        return res.status(400).json({ message: err.message });
    }
}

exports.allScreen = async (req, res) => {

    let page = parseInt(req.query.page) || 1;
    let limit = parseInt(req.query.limit) || 10;

    let skip = (page - 1) * limit;

    try {
        // Find Screen by title with pagination
        const Screens = await Screen.find({})
            .skip(skip)
            .limit(limit);
        console.log(Screens)
        const totalCount = await Screen.countDocuments({});

        if (Screens.length === 0) {
            return res.status(404).json({ message: 'No Screens found' });
        }

        return res.status(200).json({
            message: "Screens retrieved successfully.",
            currentPage: page,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            Screens
        });
    } catch (error) {
        return res.status(400).json({ message: error.info })
    }
}












