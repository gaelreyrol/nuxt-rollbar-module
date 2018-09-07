const path = require('path')
const consola = require('consola')
const Rollbar = require('rollbar')

const logger = consola.withScope('nuxt:rollbar')

module.exports = function module (moduleOptions) {
  const options = Object.assign({
    serverAccessToken: process.env.ROLLBAR_SERVER_KEY || null,
    clientAccessToken: process.env.ROLLBAR_CLIENT_KEY || null,
    disableClientSide: process.env.ROLLBAR_DISABLE_CLIENT_SIDE === 'true' || false,
    config: {}
  }, this.options.rollbar, moduleOptions)

  if (!options.serverAccessToken && !options.clientAccessToken) {
    logger.info('Disabled because no serverAccessToken nor clientAccessToken is provided')
    return
  }

  const rollbar = Rollbar({
    accessToken: options.serverAccessToken,
    ...options.config
  })

  if (!options.disableClientSide) {
    this.addPlugin({
      src: path.resolve(__dirname, 'templates/rollbar-client.js'),
      fileName: 'rollbar-client.js',
      ssr: false,
      options
    })

    logger.debug('Loaded Rollbar in client side')
  }

  if (this.nuxt.hook) {
    this.nuxt.hook('generate:routeFailed', ({ route, errors }) => {
      errors.forEach(({ error }) => {
        rollbar.error(error, { route })
      })
    })
  } else {
    this.nuxt.plugin('renderer', renderer => {
      // Grab Nuxt's original error middleware and overwrite it with our own
      const nuxtErrorMiddleware = renderer.errorMiddleware

      renderer.errorMiddleware = (err, req, res, next) => {
        // Log the error
        res.rollbar = rollbar.error(err, req)

        // Call Nuxt's original error middleware
        nuxtErrorMiddleware.call(renderer, err, req, res, next)
      }
    })
  }
}

module.exports.meta = require('../package.json')
