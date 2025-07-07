import { WhatIsMovingPage } from '../about/what-is-moving/index.js'
import { checkAnswersPage } from './check-answers/index.js'
import { OriginSection } from './section.js'

describe('OriginSection', () => {
  it('should have the correct configuration', () => {
    expect(OriginSection.config.key).toBe('origin')
    expect(OriginSection.config.title).toBe('Movement origin')
  })

  it('should have the right check answers page link', () => {
    expect(OriginSection.config.summaryLink).toBe(checkAnswersPage.urlPath)
  })

  it('should have the correct first page', () => {
    expect(OriginSection.firstPageFactory()).toBeInstanceOf(WhatIsMovingPage)
  })
})
