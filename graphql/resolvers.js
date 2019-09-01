const { retrieveMovies, addMovie, deleteMovie } = require("./models/movies");
const { retrieveUsers, addUser } = require("./models/users");
const { getRandom, findUser } = require("./../helpers/utils");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const resolvers = {
    Query: {
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
    },

    Mutation: {
        createUser: async (parent, user) => {
            let Users = await retrieveUsers();
            let newUser = {
                username: user.username,
                password: await bcrypt.hash(user.password, 10),
                user: {
                    id: Users.length,
                    name: user.username
                }
            };
            await addUser(Users, newUser);
            newUser.token = jsonwebtoken.sign({ username: user.username, password: newUser.password }, process.env.JWT_SECRET, { expiresIn: "1y" });
            return newUser;
        },
        login: async (parent, { username, password }, { user }) => {
            try {
                const foundUser = await findUser(username, password);
                foundUser.token = jsonwebtoken.sign({ username, password }, process.env.JWT_SECRET, { expiresIn: "1y" });
                return foundUser;
            } catch (error) {
                return error;
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
        },
        deleteMovie: async (parent, { input }, { user }) => {
            try {
                let { title } = input;
                await deleteMovie({ title });
                return { deleted: true };
            } catch (error) {
                return { deleted: false };
            }
        }
    }
};

module.exports = resolvers;
