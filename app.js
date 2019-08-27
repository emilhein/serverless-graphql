const { ApolloServer } = require("apollo-server-express");
const express = require("express");
const logger = require("morgan");

const typeDefs = require("./graphql/typeDefs");
const resolvers = require("./graphql/resolvers");
const authenticatedDirective = require("./graphql/directives");
process.env.JWT_SECRET = "my secret";
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
const context = ({ req }) => {
    const tokenWithBearer = req.headers.authorization || "";
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
    context
});
const app = express();
server.applyMiddleware({ app });

app.use(logger("dev"));
app.use(express.json());

const port = 3001;
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
module.exports = app;
