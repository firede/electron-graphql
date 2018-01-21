const { GraphQLFetcher } = require("../dist")

const fetcher = new GraphQLFetcher()

fetcher.init()

fetcher.fetch({ query: `{ hello }` })
  .then(result => console.log(result))
  .catch(err => console.error(err))
