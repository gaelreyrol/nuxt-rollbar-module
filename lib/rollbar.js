const path = require('path')
const consola = require('consola')
const Rollbar = require('rollbar')

const logger = consola.withScope('nuxt:rollbar')

module.exports = function module (moduleOptions) {
  const options = Object.assign({
    serverAccessToken: process.env.ROLLBAR_SERVER_KEY || null,
    clientAccessToken: process.env.ROLLBAR_CLIENT_KEY || null,
    config: {}
  }, this.options.rollbar, moduleOptions)

  if (options.clientAccessToken != null && options.clientAccessToken.length > 0) {
    this.addPlugin({
      src: path.resolve(__dirname, 'templates/rollbar-client.js'),
      fileName: 'rollbar-client.js',
      ssr: false,
      options
    })

    logger.debug('Loaded in client side')
  } else {
    logger.debug('Skip client side')
  }

  if (options.serverAccessToken != null && options.serverAccessToken.length > 0) {
    const rollbar = Rollbar.init({
      accessToken: options.serverAccessToken,
      ...options.config
    })

    this.nuxt.hook('render:errorMiddleware', app => app.use(rollbar.errorHandler()))

    logger.debug('Loaded in server side')
  } else {
    logger.debug('Skip server side')
  }
}

module.exports.meta = require('../package.json')
