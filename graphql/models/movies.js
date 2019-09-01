const { saveToS3, getS3File } = require("./../../helpers/s3");
const movieFile = "movies.json";
const addMovie = async movie => {
    try {
        let movies = await retrieveMovies();
        movies.push(movie);
        await saveToS3({ file: movies, Key: movieFile });
        return movie;
    } catch (error) {
        return Promise.reject(error);
    }
};
const deleteMovie = async ({ title }) => {
    try {
        let movies = (await retrieveMovies()).filter(e => e.title !== title);
        await saveToS3({ file: movies, Key: movieFile });
        return movie;
    } catch (error) {
        return Promise.reject(error);
    }
};
const retrieveMovies = async () => {
    try {
        return await getS3File({ Key: movieFile });
    } catch (error) {
        return Promise.reject(error);
    }
};
module.exports = { retrieveMovies, addMovie, deleteMovie };
