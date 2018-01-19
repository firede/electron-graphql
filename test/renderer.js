const ipc = require("electron").ipcRenderer

function resHandler(evt, result) {
  console.log(result)
}

ipc.on("electron-graphql-res", resHandler)
