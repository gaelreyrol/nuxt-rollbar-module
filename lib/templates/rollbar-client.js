import Vue from 'vue'
import Rollbar from 'rollbar'

const createRollbarInstance = function (accessToken) {
  const config = <%= serialize(options.config) %>
  config.accessToken = accessToken
  return new Rollbar(config)
}
<% const isValidToken = token => typeof token === 'string' && token.length > 0 %>
<% if (isValidToken(options.serverAccessToken)) { %>
const serverRollbar = createRollbarInstance('<%= options.serverAccessToken %>')
<% } %>
<% if (isValidToken(options.clientAccessToken)) { %>
const clientRollbar = createRollbarInstance('<%= options.clientAccessToken %>')
<% } %>

const noop = function () {}
const stubRollbar = Object.create(null)
Object.defineProperties(
  stubRollbar,
  Object.getOwnPropertyNames(Rollbar.prototype).reduce(function (acc, key) {
    acc[key] = { value: noop }
    return acc
  }, {}))


const RollbarAdapter = Object.create(null)
Object.defineProperty(RollbarAdapter, 'instance', {
  get() {
  <% if (isValidToken(options.serverAccessToken)) { %>
    if (process.server) {
      return serverRollbar
    }
  <% } %>
  <% if (isValidToken(options.clientAccessToken)) { %>
    if (process.client) {
      return clientRollbar
    }
  <% } %>
    return stubRollbar
  },
})

export default function (ctx, inject) {
  // Inject Rollbar to the context as $rollbar
  ctx.$rollbar = RollbarAdapter.instance
  inject('rollbar', RollbarAdapter.instance)
  Vue.rollbar = RollbarAdapter.instance
}
