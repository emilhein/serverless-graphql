const AWS = require("aws-sdk");
if (process.env.NODE_ENV === "development") {
    const credentials = new AWS.SharedIniFileCredentials({ profile: process.env.AWS_PROFILE || "default" });
    AWS.config.credentials = credentials;
}
const s3Lib = require("aws-sdk/clients/s3");
const DEVBUCKET = "ehe-development";
const s3 = new s3Lib({ region: "eu-west-1" });
const saveToS3 = async ({ Bucket = DEVBUCKET, Key, file, option = {} }) => {
    try {
        let params = {
            Body: JSON.stringify(file),
            Bucket,
            Key: `${Key}`
        };
        if (option) {
            params = Object.assign(params, option);
        }
        await s3.putObject(params).promise();
    } catch (error) {
        return Promise.reject(error);
    }
};

const getS3File = async ({ Bucket = DEVBUCKET, Key }) => {
    try {
        let params = { Bucket, Key };
        let res = await s3.getObject(params).promise();
        return JSON.parse(res.Body);
    } catch (error) {
        return Promise.reject(error);
    }
};

module.exports = { saveToS3, getS3File };
