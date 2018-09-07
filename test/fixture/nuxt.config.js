const { resolve } = require('path')

module.exports = {
  rootDir: resolve(__dirname, '../..'),
  srcDir: __dirname,
  dev: false,
  render: {
    resourceHints: false
  },
  modules: [
    ['@@', {
      serverAccessToken: 'ba78ddb653cd4f6fa17a0c171bdf4e8d',
      clientAccessToken: 'fc61ebaa44784ec6870cc6c8b3b194b4'
    }]
  ]
}
