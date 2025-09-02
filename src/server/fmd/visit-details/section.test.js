import {
  aboutSectionNonVisitComplete,
  aboutSectionVisitComplete
} from '../../common/test-helpers/exotic/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { ReasonPage } from './reason/index.js'
import { VisitDetailsSection } from './section.js'

describe('VisitDetailsSection', () => {
  it('should have the correct configuration', () => {
    expect(VisitDetailsSection.config.key).toBe('visitDetails')
    expect(VisitDetailsSection.config.title).toBe('Visit details')
  })

  it('should have the right check answers page link', () => {
    expect(VisitDetailsSection.config.summaryLink).toBe(
      checkAnswersPage.urlPath
    )
  })

  it('should have the correct first page', () => {
    expect(VisitDetailsSection.firstPageFactory()).toBeInstanceOf(ReasonPage)
  })

  it('should only be enabled if About the movement is complete & movement is a visit', () => {
    const { isEnabled } = VisitDetailsSection.config

    expect(isEnabled({})).toBe(false)
    expect(isEnabled({ about: aboutSectionNonVisitComplete })).toBe(false)
    expect(isEnabled({ about: aboutSectionVisitComplete })).toBe(true)
  })

  it('should only be visible if About the movement is complete & movement is a visit', () => {
    const { isVisible } = VisitDetailsSection.config

    expect(isVisible({})).toBe(false)
    expect(isVisible({ about: aboutSectionNonVisitComplete })).toBe(false)
    expect(isVisible({ about: aboutSectionVisitComplete })).toBe(true)
  })
})
