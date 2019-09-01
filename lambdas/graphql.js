const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("../graphql/typeDefs");
const resolvers = require("../graphql/resolvers");
const authenticatedDirective = require("../graphql/directives");
const { getUserFromToken } = require("../helpers/utils");

const context = ({ event }) => {
    if (!event.multiValueHeaders) return { user: null };
    if (!event.multiValueHeaders.Authorization) return { user: null };
    const tokenWithBearer = event.multiValueHeaders.Authorization[0] || "";
    const token = tokenWithBearer.split(" ")[1];

    const user = getUserFromToken(token);
    return { user };
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    schemaDirectives: {
        isAuthenticated: authenticatedDirective
    },
    playground: true,
    introspection: true,

    context
});

module.exports.graphqlHandler = server.createHandler({
    cors: {
        origin: "*",
        credentials: true
    }
});
