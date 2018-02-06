const { buildSchema } = require("graphql")

exports.schema = buildSchema(`
type Query {
  hello(name: String): String
}
`)

exports.rootValue = {
  hello({ name = "world" }) {
    return name
  },
}
