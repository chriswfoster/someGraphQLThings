const express = require("express")
const cors = require("cors")
const { json } = require("body-parser")
const { postgraphile } = require("postgraphile")
require("dotenv").config()
const { GraphQLServer } = require("graphql-yoga")
// import { createServer } from 'http';
// import postgraphile from 'postgraphile';





// var { buildSchema } = require('graphql'); //using just graph QL you woul ddo the below:
// Construct a schema, using GraphQL schema language
// var schema = buildSchema(`
//   type Query {
//     hello: String
//   }
// `); /// OR with graphQL build as the typeDefs below:
const typeDefs = `
type Query { 
    info: String!
    id: Int!
    users: [User!]!
    user(id: ID!): User
}
type Mutation {
    createUser(name: String!): User!
}
type User {
    id: ID!
    name: String!
}
`           // this typeDef defines your graphQL schema. It basically defines a specific query type, with a field we use here called "info"
            // the data type is of string
            // the exclamation point means it can NEVER be null.
            // every graphQL schema has 3 special "root types". That's Query, Mutation, and Subscription - 
            // ^-- corresponding to the 3 opteration types that Graphql offers
    // There is also a User type that I made, to match the requirements for this particular schema.

    






// // resolvers (the root) provides a resolver function for each API endpoint.
// // this is the actual implementation of the GraphQL schema. The structure matches the schema from the typeDefs
const resolvers = {
  Query: {
    info: () => `This is the API of Chris's GraphQL server`,
    id: () => 33,
  }
}
// var root = {
//   hello: () => {
//     return 'Hello world!';
//   },
// };




//  the GraphQL yoga server takes in 2 arguments. Type definitions and resolvers.
const server = new GraphQLServer({
  // schema: graphql,
  // Align with behavior from express-graphql
  // context: context,
  typeDefs,
  resolvers
})

server.get("/api/test", (req, res) => { // can use GraphQL as a full Restful server.
  console.log(req.query)
  res.status(200).send({ message: "okay" })
})

//Don't need any of this code below???//////////////
// const port = 1738
// const app = express();
// const app = server.express()
// app.use(json())
// app.use(cors())
// app.use('/graphql', graphqlHTTP({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
// }));
/////////////////////////////////////////////////////

// const app = express();

// createServer(postgraphile());

server.start(() => console.log("Server is running on port 4000"))

// app.listen(port, console.log("Graphql project listening on port, ", port))
