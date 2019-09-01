const { retrieveUsers } = require("./../graphql/models/users");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const getUserFromToken = token => {
    try {
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        return null;
    } catch (err) {
        return null;
    }
};
const findUser = async (username, password) => {
    const Users = await retrieveUsers();
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

module.exports = { getRandom, findUser, getUserFromToken };
