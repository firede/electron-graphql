import { GraphQLSchema, DocumentNode } from "graphql"

// Fetch types

export interface GraphQLRequest {
  query?: string | DocumentNode
  variables?: { [key: string]: any }
  operationName?: string
}

export interface FetchResult {
  data: any
  errors?: any
  extensions?: any
}

export interface FetchOptions {
  channel?: string
}

// Executor types

export interface ExecutorProps {
  schema: GraphQLSchema
  rootValue?: any
  contextValue?: any
}

export interface ExecutorOptions extends ExecutorProps {
  channel?: string
}
