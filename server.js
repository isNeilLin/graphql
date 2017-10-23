const express = require('express');
const graphqlHTTP = require('express-graphql')
// const schema = require('./schema');
// const schema = require('./graphqlSchema');
// const schema = require('./interfaceSchema');
const schema = require('./unionSchema');
let app = express();
let port = 3000;

/* let root = {
    user({id}){
        return users[id]
    },
    users(){
        return users
    },
    addUser({name,sex,intro,skills}){
        let user = {
            name,
            sex,
            intro,
            skills
        }
        users.push(user)
        return user;
    },
    addUserByInput({UserInfo}){
        users.push(UserInfo)
        return UserInfo
    }
}
 */
app.use('/graphql',graphqlHTTP({
    schema: schema,
    graphiql: true
}))

let server = app.listen(port, '127.0.0.1', function(){
    let host = server.address().address;
    console.log('GraphQL listening at http://%s:%s', host, port);
})