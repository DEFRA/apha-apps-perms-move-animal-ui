import { ExitPagePost } from './index.js'

describe('#PostController', () => {
  it('should have the correct properties', () => {
    const page = new ExitPagePost()
    expect(page.pageTitle).toBe(
      'This service does not currently send licences by post'
    )
    expect(page.urlPath).toBe('/licence/post')
    expect(page.view).toBe('licence/postExitPage/index')
  })
})
