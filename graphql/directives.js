// const { SchemaDirectiveVisitor } = require("apollo-server-express");
const { SchemaDirectiveVisitor } = require("apollo-server-lambda");

const { defaultFieldResolver } = require("graphql");

module.exports = class IsAuthUserDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const { resolve = defaultFieldResolver } = field;
        field.resolve = async function(...args) {
            let { user } = args[2];
            if (user) {
                const result = await resolve.apply(this, args);
                return result;
            } else {
                throw new Error("You must be the authenticated user to get this information");
            }
        };
    }
};
