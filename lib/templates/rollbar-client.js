import Vue from 'vue'
import Rollbar from 'vue-rollbar'

export default function (ctx, inject) {

  // Inject Rollbar to the context as $rollbar
  ctx.$rollbar = Rollbar
  inject('rollbar', Rollbar)

  const config = <%= serialize(options.config) %>
  config.accessToken = '<%= options.clientAccessToken %>'

  Vue.use(Rollbar, config)

}
