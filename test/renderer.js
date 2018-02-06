const { GraphQLFetcher } = require("../dist")
const gql = require("graphql-tag")

const fetcher = new GraphQLFetcher()

fetcher.init()

const queryElement = document.getElementById("query")
const resultElement = document.getElementById("result")
const sendElement = document.getElementById("send")
const refElement = document.getElementById("ref")

function sendQuery() {
  const ref = refElement.value
  // if ref start with `gql:`, using gql.
  const query = ref.indexOf("gql:") === 0 ? gql(queryElement.value) : queryElement.value

  fetcher
    .fetch({ query: query })
    .then(result => {
      resultElement.value = JSON.stringify(result)
      resultElement.setAttribute("data-ref", ref)
    })
    .catch(err => console.error(err))
}

sendElement.addEventListener("click", sendQuery.bind(this), false)
