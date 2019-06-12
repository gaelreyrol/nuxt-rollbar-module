const path = require('path')
const consola = require('consola')
const Rollbar = require('rollbar')

const logger = consola.withScope('nuxt:rollbar')
const isValidToken = token => typeof token === 'string' && token.length > 0

module.exports = function module(moduleOptions) {
  const options = {
    serverAccessToken: process.env.ROLLBAR_SERVER_KEY || null,
    clientAccessToken: process.env.ROLLBAR_CLIENT_KEY || null,
    config: {},
    ...this.options.rollbar,
    ...moduleOptions
  }

  const isClientTokenValid = isValidToken(options.clientAccessToken)
  const isServerTokenValid = isValidToken(options.serverAccessToken)

  if (!isClientTokenValid && !isServerTokenValid) {
    return
  }

  this.addPlugin({
    src: path.resolve(__dirname, 'templates/rollbar-client.js'),
    fileName: 'rollbar-client.js',
    options
  })

  logger.debug(
    isClientTokenValid ? 'Loaded in client side' : 'Skip client side'
  )
  logger.debug(
    isServerTokenValid ? 'Loaded in server side' : 'Skip server side'
  )

  if (isServerTokenValid) {
    const rollbar = Rollbar.init({
      ...options.config,
      accessToken: options.serverAccessToken
    })

    this.nuxt.hook('render:errorMiddleware', app =>
      app.use(rollbar.errorHandler())
    )
  }
}

module.exports.meta = require('../package.json')
