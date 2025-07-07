import { WhatIsMovingPage } from '../about/what-is-moving/index.js'
import { checkAnswersPage } from './check-answers/index.js'
import { MovementOriginSection } from './section.js'

describe('MovementOriginSection', () => {
  it('should have the correct configuration', () => {
    expect(MovementOriginSection.config.key).toBe('movementOrigin')
    expect(MovementOriginSection.config.title).toBe('Movement origin')
  })

  it('should have the right check answers page link', () => {
    expect(MovementOriginSection.config.summaryLink).toBe(
      checkAnswersPage.urlPath
    )
  })

  it('should have the correct first page', () => {
    expect(MovementOriginSection.firstPageFactory()).toBeInstanceOf(
      WhatIsMovingPage
    )
  })
})
