# electron-graphql

Lightweight GraphQL server & client for Electron apps.

This project is **WORK IN PROGRESS**, do **NOT** try to use it :trollface:

# Installation

```sh
npm i electron-graphql
```

## Usage

### main progress

```js
// `executor` only works in main progress
const { createGraphQLExecutor } = require("electron-graphql")

// create GraphQL executor
const gqlExecutor = createGraphQLExecutor({
  // electron IPC channel (base name)
  channel,
  schema,
  rootValue,
  contextValue
})

// init GraphQL executor
gqlExecutor.init()

// dispose GraphQL executor
gqlExecutor.dispose()
```

### renderer process

```js
// `fetcher` only works in renderer process
import { createGraphQLFetcher } from "electron-graphql"

// create GraphQL fetcher
const gqlFetcher = createGraphQLFetcher({ channel, timeout })

// init GraphQL fetcher
gqlFetcher.init()

// use GraphQL fetch
gqlFetcher.fetch({ query, variables, operationName })
  .then(result => {
    const { data, errors, extensions } = result
    // GraphQL errors and extensions are optional
  })
  .catch(error => {
    //respond to a connect error
  })

// dispose GraphQL fetcher
gqlFetcher.dispose()
```

## API

(TODO).

---

<p align="center">MIT &copy; <a href="https://github.com/firede">Firede</a>, built with :coffee: &amp; :sparkling_heart:<p>
