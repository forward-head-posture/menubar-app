const { menubar } = require("menubar")
const { ipcMain, nativeImage, Tray } = require("electron")

const { NODE_ENV } = process.env

let tray

ipcMain.on("score", async (_, score) => {
  tray.setTitle(Math.round(score).toString())
})

module.exports = function createMenubar() {
  const pencilDataURL =
    "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAMAAAC6V+0/AAAAhFBMVEUAAADs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PHs8PFed9IBAAAAK3RSTlMAAQMEBQYLIScqLC0vMjU2ODk+QkN+f4KGi46SlZeanbe5wMHDyNni8/f9aI/hMAAAAH5JREFUGBmdwUkCgjAQBMCORkTcjUFxBaOi0///n3OKgSNVGGbzytHnSCnQZUqqAin3sCXJLxI7qYL15BV/W9k3DNbfDaK1uIbk0xpES3E11c0gWoirqS4G0VxcTXU2iGafd6A6ISHTrCVZIcV8nLU8ooNcjcIBXVQePROFgX5ezA2dwHGGSQAAAABJRU5ErkJggg=="
  tray = new Tray(nativeImage.createFromDataURL(pencilDataURL))
  const mb = menubar({
    browserWindow: {
      show: false,
      width: NODE_ENV === "development" ? 1024 : 512,
      height: 256,
      webPreferences: {
        nodeIntegration: true,
        backgroundThrottling: false
      }
    },
    env: { NODE_ENV: "test" },
    index: `file://${__dirname}/app.html`,
    tray
  })

  mb.on("ready", () => {
    if (NODE_ENV === "test") {
      mb.showWindow()
    }
  })
}
