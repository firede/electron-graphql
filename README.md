# electron-graphql

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

// dispose GraphQL executor
gqlExecutor.dispose()
```

### renderer process

```js
// `fetch` only works in renderer process
import { createGraphQLFetch } from "electron-graphql"

// create GraphQL fetch
const gqlFetch = createGraphQLFetch({ channel })

// use GraphQL fetch
gqlFetch({ query, variables, operationName })
  .then(result => {
    const { data, errors, extensions } = result
    // GraphQL errors and extensions are optional
  })
  .catch(error => {
    //respond to a connect error
  })
```

## API

(TODO).

---

<p align="center">MIT &copy; <a href="https://github.com/firede">Firede</a>, built with :coffee: &amp; :sparkling_heart:<p>
