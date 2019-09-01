const { gql } = require("apollo-server-lambda");

// Construct a schema using GraphQL schema language
const typeDefs = gql`
    directive @isAuthenticated(reason: String = "You need to send a valid token.") on FIELD_DEFINITION

    type movie {
        title: String!
        scoutbase_rating: String @isAuthenticated(reason: "You need to send a valid token.")
        year: Int!
        rating: String!
        actors: [person]
    }
    type person {
        name: String!
        birthday: String!
        country: String!
        directors: [director]
    }
    type director {
        name: String!
        birthday: String!
        country: String!
    }
    type publicUser {
        id: Int!
        name: String!
    }

    type user {
        username: String!
        password: String!
        token: String
        user: publicUser
    }

    type Query {
        movies: [movie]
    }

    type Mutation {
        createUser(username: String!, password: String!): user
        login(username: String!, password: String!): user
        addMovie(input: createMovieInput!): movie @isAuthenticated(reason: "You need to send a valid token.")
        deleteMovie(input: deleteMovieInput!): movieReturn @isAuthenticated(reason: "You need to send a valid token.")
    }

    input deleteMovieInput {
        title: String!
    }
    type movieReturn {
        deleted: Boolean!
    }
    input createMovieInput {
        title: String!
        year: Int!
        rating: String!
    }
`;

module.exports = typeDefs;
