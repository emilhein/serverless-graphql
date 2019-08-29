// const { gql } = require("apollo-server-express");
const { gql } = require("apollo-server-lambda");

// Construct a schema using GraphQL schema language
const typeDefs = gql`
    directive @isAuthenticated(reason: String = "You need to send a valid token.") on FIELD_DEFINITION

    type movies {
        title: String
        scoutbase_rating: String @isAuthenticated(reason: "You need to send a valid token.")
        year: Int
        rating: String
        actors: [person]
    }
    type person {
        name: String!
        birthday: String!
        country: String!
        directors: [person]
    }
    type publicUser {
        id: Int!
        name: String
    }

    type user {
        username: String!
        password: String!
        token: String
        user: publicUser
    }

    type Query {
        movies: [movies]
    }

    type Mutation {
        createUser(username: String!, password: String!): user
        login(username: String!, password: String!): user
    }
`;

module.exports = typeDefs;
