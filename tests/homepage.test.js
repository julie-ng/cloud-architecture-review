import { get, setupTest } from '@nuxt/test-utils'

describe('Homepage', () => {
  setupTest({
    server: true
  })

  it('renders the homepage', async () => {
    const { body } = await get('/')

    expect(body).toContain('Go to Questions')
  })
})
