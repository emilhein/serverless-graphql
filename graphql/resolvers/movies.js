const { retrieveMovies, addMovie, deleteMovie } = require("./../models/movies");
const { getRandom } = require("./../../helpers/utils");
const addRatings = movies =>
    movies.map(e => {
        e.scoutbase_rating = `${getRandom(5, 10, 2)}`;
        return e;
    });
const mutations = {
    deleteMovie: async (parent, { input }, { user }) => {
        try {
            let { title } = input;
            await deleteMovie({ title });
            return { deleted: true };
        } catch (error) {
            return { deleted: false };
        }
    },
    addMovie: async (parent, { input }, { user }) => {
        try {
            let movie = { ...input, actors: [{ name: "", birthday: "", country: "", directors: [] }] };
            await addMovie(movie);
            return movie;
        } catch (error) {
            return error;
        }
    }
};
const queries = {
    movies: async () => {
        try {
            let movies = await retrieveMovies();
            return addRatings(movies);
        } catch (error) {
            return Promise.reject(error);
        }
    },
    movieByTitle: async (parent, { title }, { user }) => {
        try {
            const movies = await retrieveMovies();
            const moviesWithRating = addRatings(movies);

            let foundMovie = moviesWithRating.find(e => e.title.toLowerCase() === title);
            return foundMovie;
        } catch (error) {
            return Promise.reject(error);
        }
    }
};
module.exports = { mutations, queries };
