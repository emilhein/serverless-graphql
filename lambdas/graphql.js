const { ApolloServer } = require("apollo-server-lambda");
const typeDefs = require("../graphql/typeDefs");
const resolvers = require("../graphql/resolvers");
const authenticatedDirective = require("../graphql/directives");
const jwt = require("jsonwebtoken");

const getUser = token => {
    try {
        if (token) {
            return jwt.verify(token, process.env.JWT_SECRET);
        }
        return null;
    } catch (err) {
        return null;
    }
};

const context = ({ event }) => {
    if (!event.multiValueHeaders) return { user: null };
    if (!event.multiValueHeaders.Authorization) return { user: null };
    const tokenWithBearer = event.multiValueHeaders.Authorization[0] || "";
    const token = tokenWithBearer.split(" ")[1];

    const user = getUser(token);
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
