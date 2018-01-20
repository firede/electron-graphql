import { ipcMain, Event } from "electron"
import { execute as graphqlExecute, graphql, ExecutionResult } from "graphql"
import { ExecutorProps, ExecutorOptions, GraphQLRequest } from "./types"

export function createGraphQLExecutor(options: ExecutorOptions): GraphQLExecutor {
  return new GraphQLExecutor(options)
}

export class GraphQLExecutor {
  private channel: string
  private props: ExecutorProps

  private get reqChannel(): string {
    return `${this.channel}-req`
  }

  private get resChannel(): string {
    return `${this.channel}-res`
  }

  constructor({ channel = "electron-graphql", schema, rootValue, contextValue }: ExecutorOptions) {
    this.channel = channel
    this.props = {
      schema,
      rootValue,
      contextValue,
    }
  }

  private req(evt: Event, obj: GraphQLRequest) {
    this.execute(obj)
      .then(result => {
        evt.sender.send(this.resChannel, result)
      })
      .catch(err => {
        // TODO: add error logs (if needed)
        console.error(err)
      })
  }

  // as a public method, you can use it in main process.
  public execute({ query, variables: variableValues, operationName }: GraphQLRequest): Promise<ExecutionResult> {
    if (typeof query === "string") {
      // if query is string, using `graphql` function with validation
      return graphql({
        ...this.props,
        source: query,
        variableValues,
        operationName,
      })
    } else {
      // otherwise `execute` it directly
      return graphqlExecute({
        ...this.props,
        document: query,
        variableValues,
        operationName,
      })
    }
  }

  public init() {
    ipcMain.on(this.reqChannel, this.req.bind(this))
  }

  public dispose() {
    ipcMain.removeAllListeners(this.reqChannel)
  }
}
