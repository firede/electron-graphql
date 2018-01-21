import { ipcRenderer, Event } from "electron"
import { FetcherOptions, FetchResult, GraphQLRequest } from "./types"
import * as uuid from "uuid/v4"

export function createGraphQLFetcher(options: FetcherOptions): GraphQLFetcher {
  return new GraphQLFetcher(options)
}

export class GraphQLFetcher {
  private props: FetcherOptions

  private get reqChannel(): string {
    return `${this.props.channel}-req`
  }

  private get resChannel(): string {
    return `${this.props.channel}-res`
  }

  private callbackMap: Map<string, Function> = new Map()

  private callbackInvoker(_evt: Event, callbackId: string, result: FetchResult) {
    if (this.callbackMap.has(callbackId)) {
      // invoke
      this.callbackMap.get(callbackId)(result)
      // clean
      this.callbackMap.delete(callbackId)
    }
  }

  constructor(options?: FetcherOptions) {
    this.props = Object.assign(
      {
        channel: "electron-graphql",
        timeout: 5000,
      },
      options
    )
  }

  public init() {
    ipcRenderer.on(this.resChannel, this.callbackInvoker.bind(this))
  }

  public dispose() {
    ipcRenderer.removeAllListeners(this.resChannel)
  }

  public fetch(params: GraphQLRequest) {
    return new Promise((resolve, reject) => {
      // unique callback id
      const callbackId = uuid()

      // register callback
      this.callbackMap.set(callbackId, (result: FetchResult) => {
        resolve(result)
      })

      // timeout
      setTimeout(() => {
        if (this.callbackMap.has(callbackId)) {
          // delete expired callback
          this.callbackMap.delete(callbackId)

          reject(`query timeout! callback id: ${callbackId}`)
        }
      }, this.props.timeout)

      ipcRenderer.send(this.reqChannel, callbackId, params)
    })
  }
}
