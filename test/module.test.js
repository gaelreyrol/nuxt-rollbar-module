const { Nuxt, Builder } = require('nuxt')
const request = require('request-promise-native')
const { resolve } = require('path')

const url = path => `http://localhost:3000${path}`
const get = path => request(url(path))

describe('withEnv', () => {
  require('dotenv').config({
    path: resolve(__dirname, './.env.testing')
  })
  const config = require('./fixture/nuxt.config.withenv')

  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    await nuxt.listen(3000)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    let html = await get('/')
    expect(html).toContain('Works!')
  })
})

describe('withArgs', () => {
  const config = require('./fixture/nuxt.config.withargs')

  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    await nuxt.listen(3000)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    let html = await get('/')
    expect(html).toContain('Works!')
  })
})

describe('withOptions', () => {
  const config = require('./fixture/nuxt.config.withoptions')

  let nuxt

  beforeAll(async () => {
    nuxt = new Nuxt(config)
    await new Builder(nuxt).build()
    await nuxt.listen(3000)
  }, 60000)

  afterAll(async () => {
    await nuxt.close()
  })

  test('render', async () => {
    let html = await get('/')
    expect(html).toContain('Works!')
  })
})
