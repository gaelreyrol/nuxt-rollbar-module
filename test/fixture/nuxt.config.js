const { resolve } = require('path')

require('dotenv').config()

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    ['@@', {
      config: {
        captureUncaught: true,
        captureUnhandledRejections: true
      }
    }]
  ]
}
