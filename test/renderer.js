const { GraphQLFetcher } = require("../dist")
const gql = require("graphql-tag")

const fetcher = new GraphQLFetcher()

fetcher.init()

fetcher
  .fetch({ query: `{ hello }` })
  .then(result => console.log("string query:", result))
  .catch(err => console.error(err))

const queryDocument = gql`
  query GraphQLTagQuery {
    hello
  }
`

fetcher
  .fetch({ query: queryDocument })
  .then(result => console.log("query document:", result))
  .catch(err => console.error(err))
