import { Application } from "spectron"
import { resolve } from "path"

const appPath = __dirname
const electronPath = resolve(__dirname, "../node_modules/.bin/electron")

// shared spection instance
let app

beforeEach(async () => {
  app = new Application({
    path: electronPath,
    args: [appPath],
  })

  await app.start()
})

afterEach(async () => {
  if (app && app.isRunning()) {
    await app.stop()
  }
})

async function getResult(client, ref, queryText) {
  await app.client.waitUntilWindowLoaded()
  await app.client.setValue("#query", queryText)
  await app.client.setValue("#ref", ref)
  await app.client.click("#send")
  await app.client.waitForExist(`#result[data-ref="${ref}"]`)

  const resultText = await app.client.getValue("#result")
  return JSON.parse(resultText)
}

test("spectron should work.", () => {
  return app.client.getTitle().then(title => expect(title).toBe("electron-graphql-test"))
})

test("send simple query text.", async () => {
  const result = await getResult(app.client, "SimpleQuery", "{ hi: hello }")

  return expect(result.data.hi).toBe("world")
})

test("send query text with args.", async () => {
  const result = await getResult(app.client, "ArgsQuery", `query { hello(name: "Firede") }`)

  return expect(result.data.hello).toBe("Firede")
})

test("send query document.", async () => {
  const result = await getResult(app.client, "gql:QueryDocument", `query WithGQL { nihao: hello }`)

  return expect(result.data.nihao).toBe("world")
})
