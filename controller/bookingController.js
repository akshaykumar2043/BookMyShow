const Booking = require("../models/booking");
const ShowTiming = require("../models/showTiming")
const nodemailer = require('nodemailer');


exports.createBooking = async (req, res) => {
    const { showTimingId, customerName, customerContact, customerEmail, seatsBooked } = req.body;
    try {
        const showTiming = await ShowTiming.findById(showTimingId).populate("movie");
        if (!showTiming) {
            return res.status(404).json({ message: 'Show timing not found' });
        }
        if (showTiming.availableSeats < seatsBooked) {
            return res.status(400).json({ message: 'Not enough seats available' });
        }
        showTiming.availableSeats -= seatsBooked;
        await showTiming.save();

        const booking = await Booking.create({
            showTiming: showTimingId,
            customerName,
            customerContact,
            customerEmail,
            seatsBooked,
        });
        const transporter = nodemailer.createTransport({
            service: "gmail",
            port: 587,
            secure: false,
            auth: {
                user: 'netset.dev.rajan@gmail.com',
                pass: 'hegnfatwryicpmfh',
            },
        });
        const mailOptions = {
            from: 'netset.dev.rajan@gmail.com',
            to: customerEmail,
            subject: 'Booking Confirmation',
            html: `<p>Your booking for ${showTiming.movie.title} on ${showTiming.dateTime} is confirmed. Booking ID: ${booking._id}</p>`
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if (error) {
                console.log(error);
                return res.status(500).json({ message: "error send mail!!" });
            } else {
                return res.status(201).json({ message: "successfull booking:", response });
            }
        });
    } catch (error) {
        return res.status(500).json({ message: "internal error!!" });
    }
};

exports.getBookingData = async (req, res) => {

    const { customerName } = req.query;
    if (!customerName) { return res.status(400).json({ message: "invalid customerName" }) }
    try {
        const bookingData = await Booking.find({ customerName: { $regex: customerName, $options: "i" } })
            .populate({
                path: "showTiming",
                populate: [
                    { path: "movie" },
                    {
                        path: "cinemaHall",
                        populate: [{ path: "screen" }]
                    }
                ]
            });
        if (bookingData.length === 0) {
            return res.status(404).json({ message: "No bookingData found" });
        }
        console.log(`Number of bookings found: ${bookingData.length}`);
        return res.status(200).json({ message: "Successfully retrieved bookingData", bookingData });
    } catch (error) {
        console.error("Error fetching booking data:", error);
        return res.status(500).json({ message: "Internal server error", error: error.message });
    }
};

exports.getContacts = async (req, res) => {
    try {
        const booking = await Booking.find();
        console.log(booking);
        if (booking.length === 0) { return res.status(404).json({ message: "booking not found" }) };

        const Contacts = booking.map(booking => booking.customerContact);

        console.log({ message: "successful", Contacts });

        return res.status(200).json({ message: "successful", Contacts });
    } catch (error) {
        return res.status(400).json({ message: "internal error", error: error.message });
    }
};

exports.bookingSearch = async (req, res) => {
    try {

        const rgx = (pattern) => new RegExp(`.*${pattern}.*`, 'i');
        const search = req.query.search;

        let page = parseInt(req.query.page) || 1;
        let limit = parseInt(req.query.limit) || 10;
        
        let skip = (page - 1) * limit;

        if (search) {
            const bookings = await Booking.find({
                $or: [
                    { customerEmail: { $regex: rgx(search) } },
                    { customerName: { $regex: rgx(search) } },
                    { customerContact: { $regex: rgx(search) } },
                ]
            })
                .skip(skip)
                .limit(limit)
                .populate({
                    path: "showTiming",
                    populate: [
                        { path: "movie" },
                        {
                            path: "cinemaHall",
                            populate: [{ path: "screen" }]
                        }
                    ]
                });
            const totalCount = await Booking.countDocuments({
                $or: [
                    { customerEmail: { $regex: rgx(search) } },
                    { customerName: { $regex: rgx(search) } },
                    { customerContact: { $regex: rgx(search) } },
                ]
            });
            if (bookings.length === 0) {
                return res.status(404).json({ message: "No bookings found for the provided search term." });
            }
            return res.status(200).json({
                message: "Bookings retrieved successfully.",
                currentPage: page,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                bookings
            });
        } else {
            const bookings = await Booking.find()
                .skip(skip)
                .limit(limit)
                .populate({
                    path: "showTiming",
                    populate: [
                        { path: "movie" },
                        {
                            path: "cinemaHall",
                            populate: [{ path: "screen" }]
                        }
                    ]
                });
            const totalCount = await Booking.countDocuments();
            if (bookings.length === 0) {
                return res.status(404).json({ message: "No bookings found " });
            }
            return res.status(200).json({
                message: "Bookings retrieved successfully.",
                currentPage: page,
                totalItems: totalCount,
                totalPages: Math.ceil(totalCount / limit),
                bookings
            });
        }
    } catch (error) {
        return res.status(500).json({ message: "Internal server error.", error: error.message });
    }
};


