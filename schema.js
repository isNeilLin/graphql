const { buildSchema } = require('graphql');

module.exports = buildSchema(`
    type User {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    input UserInput {
        name: String!
        sex: String
        intro: String
        skills: [String]!
    }
    type Query {
        user(id:Int!): User
        users: [User]
    }
    type Mutation {
        addUser(name:String!,sex:String,intro:String,skills:[String]!):User
        addUserByInput(UserInfo: UserInput!): User
    }
`)