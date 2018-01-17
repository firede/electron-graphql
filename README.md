# electron-graphql

This project is **WORK IN PROGRESS**, do **NOT** try to use it :trollface:

# Installation

```sh
npm i electron-graphql
```

## Usage

### main progress

```js
// `provider` only works in main progress
const { createGraphQLProvider } = require("electron-graphql")

// create GraphQL provider
const gqlProvider = createGraphQLProvider({
  // electron IPC channel (base name)
  channel,
  schema,
  root,
  context
})

// dispose GraphQL provider
gqlProvider.dispose()
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
