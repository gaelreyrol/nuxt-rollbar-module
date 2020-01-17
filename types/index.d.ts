import Vue from 'vue'
import Rollbar from 'rollbar'

declare module '@nuxt/vue-app' {
  interface Context {
    $rollbar: Rollbar
  }
  interface NuxtAppOptions {
    $rollbar: Rollbar
  }
}

// Nuxt 2.9+
declare module '@nuxt/types' {
  interface Context {
    $rollbar: Rollbar
  }
  interface NuxtAppOptions {
    $rollbar: Rollbar
  }
}

declare module 'vue/types/vue' {
  interface Vue {
    $rollbar: Rollbar
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $rollbar: Rollbar
  }
}
