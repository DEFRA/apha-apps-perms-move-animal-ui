import { Page } from './page-model.js'

describe('Page', () => {
  it('should have a path', () => {
    const page = new Page()
    expect(page).toHaveProperty('urlPath')
  })
})
