const { Movies } = require("./models/movies");
const { Users } = require("./models/users");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");

const findUser = async (username, password) => {
    const foundUser = Users.find(e => e.username === username);
    if (!foundUser) {
        throw new Error("No user with that email");
    }
    const valid = await bcrypt.compare(password, foundUser.password);

    if (!valid) {
        throw new Error("Incorrect password");
    }
    return foundUser;
};
const getRandom = (min, max, decimalPlaces) => {
    var rand = Math.random() * (max - min) + min;
    var power = Math.pow(10, decimalPlaces);
    return Math.floor(rand * power) / power;
};

const resolvers = {
    Query: {
        movies: () =>
            Movies.map(e => {
                e.scoutbase_rating = `${getRandom(5, 10, 2)}`;
                return e;
            })
    },

    Mutation: {
        createUser: async (parent, user) => {
            let newUser = {
                username: user.username,
                password: await bcrypt.hash(user.password, 10),
                user: {
                    id: Users.length,
                    name: user.username
                }
            };
            Users.push(newUser);
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
        }
    }
};

module.exports = resolvers;
