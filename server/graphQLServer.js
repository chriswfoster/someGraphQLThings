const express = require("express")
const cors = require("cors")
const { json } = require("body-parser")
const { postgraphile } = require("postgraphile")
require("dotenv").config()
const { GraphQLServer } = require("graphql-yoga")

const typeDefs = `
type Query { 
    info: String!
    feed:[Link!]!
    link(id: ID!): Link
}
type Link {
    id: ID!
    description: String!
    url: String!
}
type Mutation {
    post(url: String!, description: String!): Link!
    updateLink(id: ID!, url: String, description: String): Link
}
` // Here I'm defining a new Link type that represents the links that can be posted to Hacker News
// each link has an id, description, and url.
// then I'm adding another root field to the Query type, that allows me to retrieve a list of Link elements (the feed)

let links = [
  {
    id: "link-0",
    url: "www.howtographql.com",
    description: "Fullstack tutorial for GraphQL"
  },
  {
    id: "link-1",
    url: "www.google.com",
    description: "Googles website"
  }
]
let idCount = links.length

const resolvers = {
  Query: {
    info: () => `This is the API of Chris's GraphQL server`,
    feed: () => {
      console.log('happened')
      return links
    }, // the feed will return the array of feed links.
    link: (parent, args) => {
      const filteredArr = links.filter(item => item.id === args.id)
      return filteredArr[0]
    }
  },
  Link: {
    // first paramater of resolver function is called parent (or sometimes root).
    id: parent => parent.id, /// ohhh I think the parent function (feed from above) passes the data object in, with id, desc, and url
    description: parent => parent.description,
    url: parent => parent.url
  },
  Mutation: {
    post: (parent, args) => {
      //args is obviously the data passed into the post function above.
      const link = {
        id: `link-${idCount++}`, // give it the value of idCount, then increment idCount once
        description: args.description,
        url: args.url
      }
      links.push(link) // push the above link into the links array.
      return link
    },
    updateLink: (parent, args) => {
      let tempLink
      const filteredLink = links.map(item => {
        if (item.id === args.id) {
          if (args.description) {
            item.description = args.description
          }
          if (args.url) {
            item.url = args.url
          }
          tempLink = item
        }
        return item
      })
      links = filteredLink
      return tempLink
    }
  }
}

const opts = {
  port: 4000,
  endpoint: '/graphql'
}

const server = new GraphQLServer({
  typeDefs, //// or you could include a file path here to a schema: './schema.graphql',
  resolvers,
  opts
})

server.get("/api/test", (req, res) => {
  // can use GraphQL as a full Restful server.
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
