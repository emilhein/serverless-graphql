const { retrieveMovies, addMovie, deleteMovie } = require("./../models/movies");
const { getRandom } = require("./../../helpers/utils");

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
            return movies.map(e => {
                e.scoutbase_rating = `${getRandom(5, 10, 2)}`;
                return e;
            });
        } catch (error) {
            return Promise.reject(error);
        }
    }
};
module.exports = { mutations, queries };
