import { ActionableExitPage } from './actionable-exit-page-model.js'

describe('ActionableExitPage', () => {
  let page

  beforeEach(() => {
    page = new ActionableExitPage()
  })

  it('should have undefined _indirectAction by default', () => {
    expect(page._indirectAction).toBeUndefined()
  })

  it('should get and set indirectAction', () => {
    const mockConfig = { page: { id: 1 }, answer: { value: 'test' } }
    page._indirectAction = mockConfig
    expect(page.indirectAction).toBe(mockConfig)
  })
})
