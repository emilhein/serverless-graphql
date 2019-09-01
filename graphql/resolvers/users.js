const { retrieveUsers, addUser } = require("./../models/users");
const bcrypt = require("bcryptjs");
const jsonwebtoken = require("jsonwebtoken");
const { findUser } = require("./../../helpers/utils");

const mutations = {
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
    }
};
module.exports = { mutations };
