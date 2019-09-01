const usersMutations = require("./resolvers/users").mutations;
const movieMutations = require("./resolvers/movies").mutations;
const movieQueries = require("./resolvers/movies").queries;

const resolvers = {
    Query: {
        ...movieQueries
    },

    Mutation: {
        ...usersMutations,
        ...movieMutations
    }
};

module.exports = resolvers;
