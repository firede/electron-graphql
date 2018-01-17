const { BrowserWindow, app } = require("electron")
const { format } = require("url")
const { join } = require("path")

let mainWindow = null

app.on("ready", () => {
  mainWindow = new BrowserWindow()

  mainWindow.loadURL(
    format({
      pathname: join(__dirname, "main.fixture.html"),
      protocol: "file:",
      slashes: true,
    })
  )
})
