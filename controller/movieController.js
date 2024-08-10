const Movie = require("../models/movie");


exports.createMovie = async (req, res) => {
    try {
        const { title, genre, duration, director, cast, description_english, description_hindi, originalLanguage, releaseDate } = req.body;

        let movieImage = '';
        if (req.files && req.files.movieImage && req.files.movieImage[0]) { movieImage = `movieImage/${req.files.movieImage[0].filename}` }

        const movie = await Movie.create({
            movieImage,
            title,
            genre,
            duration,
            director,
            cast,
            description_english,
            description_hindi,
            originalLanguage,
            releaseDate
        })
        console.log(movie);
        return res.status(200).json({ message: "successfull created", movie })
    } catch (error) {
        console.log(error)
        return res.status(400).json({ message: "unsuccessfull", error: error });
    }
}



// Search/select movie by title
exports.getMovieByTitle = async (req, res) => {

    const title = req.query.title;
    
   let page = parseInt(req.query.page) || 1;
   let limit = parseInt(req.query.limit) || 10;

   let skip = (page - 1) * limit;

    try {
        // Find movies by title with pagination
        const movies = await Movie.find({ title: new RegExp(title, 'i')})  
            .skip(skip)
            .limit(limit);

        const totalCount = await Movie.countDocuments( { title: new RegExp(title, 'i')} );  

        if (movies.length === 0) {
            return res.status(404).json({ message: 'No movies found' });
        }

        return res.status(200).json({
            message:"Movies retrieved successfully.",
            currentPage: page,
            totalItems: totalCount,
            totalPages: Math.ceil(totalCount / limit),
            movies
        });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};



