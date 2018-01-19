import { EventEmitter } from "events"
import { ExecutorOptions } from "./types"
import { ipcMain, Event } from "electron"

export function createGraphQLProvider(options: ExecutorOptions): GraphQLExecutor {
  return new GraphQLExecutor(options)
}

export class GraphQLExecutor extends EventEmitter {
  private channel: string

  private get reqChannel(): string {
    return `${this.channel}-req`
  }

  private get resChannel(): string {
    return `${this.channel}-res`
  }

  constructor({ channel = "electron-graphql" }: ExecutorOptions) {
    super()
    this.channel = channel
  }

  private req(evt: Event, ...args: any[]) {
    // validate & execute
  }

  public init() {
    ipcMain.on(this.reqChannel, this.req)
  }

  public dispose() {
    ipcMain.removeListener(this.reqChannel, this.req)
  }
}
