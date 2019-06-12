import Vue from 'vue'
import Rollbar from 'rollbar'

const createRollbarInstance = accessToken => new Rollbar({ ...<%= serialize(options.config) %>, accessToken })
<% const isValidToken = token => typeof token === 'string' && token.length > 0 %>
<% if (isValidToken(options.serverAccessToken)) { %>
const serverRollbar = createRollbarInstance('<%= options.serverAccessToken %>')
<% } %>
<% if (isValidToken(options.clientAccessToken)) { %>
const clientRollbar = createRollbarInstance('<%= options.clientAccessToken %>')
<% } %>

const noop = () => {}
const stubRollbar = Object.create(null)
Object.defineProperties(
  stubRollbar,
  Object.getOwnPropertyNames(Rollbar.prototype).reduce((acc, key) => ({
    ...acc,
    [key]: {
      value: noop,
    },
  }), {}))


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
