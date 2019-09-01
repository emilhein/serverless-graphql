const { saveToS3, getS3File } = require("./../../helpers/s3");
const usersFile = "users.json";
const retrieveUsers = async () => {
    try {
        return await getS3File({ Key: usersFile });
    } catch (error) {
        return Promise.reject(error);
    }
};
const addUser = async (allUsers, user) => {
    try {
        let usersToSave = [...allUsers, user].filter(e => e !== null);
        await saveToS3({ file: usersToSave, Key: usersFile });
        return user;
    } catch (error) {
        return Promise.reject(error);
    }
};
module.exports = { retrieveUsers, addUser };
