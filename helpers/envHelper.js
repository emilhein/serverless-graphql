"use strict";

const AWS = require("aws-sdk");

const ssm = new AWS.SSM({ region: "eu-west-1" });

module.exports.setEnvParamFromSSM = async Name => {
    const params = { Name, WithDecryption: true };
    try {
        let res = await ssm.getParameter(params).promise();
        process.env[Name] = res.Parameter.Value;
        return "ok";
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};
module.exports.getEnvParam = async Name => {
    const params = { Name, WithDecryption: true };
    try {
        let res = await ssm.getParameter(params).promise();
        return res.Parameter.Value;
    } catch (error) {
        console.log(error);
        return Promise.reject(error);
    }
};
