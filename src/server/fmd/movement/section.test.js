import {
  aboutSectionCompleteOtherMovement,
  aboutSectionCompleteSlaughter
} from '../../common/test-helpers/fmd/journey-state.js'
import { checkAnswersPage } from './check-answers/index.js'
import { DairyNamePage } from './dairy-name/index.js'
import { DisposalDatePage } from './disposal-date/index.js'
import { MaximumDaysAnimalsPage } from './maximum-days-animals/index.js'
import { MovementDetailsSection } from './section.js'
import { TwoWeekRepeatPage } from './two-week-repeat/index.js'

describe('MovementDetailsSection', () => {
  it('should have the correct configuration', () => {
    expect(MovementDetailsSection.config.key).toBe('movement')
    expect(MovementDetailsSection.config.title).toBe('Movement details')
  })

  it('should have the right check answers page link', () => {
    expect(MovementDetailsSection.config.summaryLink).toBe(
      checkAnswersPage.urlPath
    )
  })

  it.each([
    ['milk', 'producer', TwoWeekRepeatPage],
    ['milk', 'dairy', DairyNamePage],
    ['live-animals', null, MaximumDaysAnimalsPage],
    ['carcasses', null, DisposalDatePage]
  ])(
    'should have the correct first page for %s and should return %s',
    (whatIsMoving, milkWhoIsMoving, expectedPageType) => {
      expect(
        MovementDetailsSection.firstPageFactory({
          about: {
            whatIsMoving,
            milkWhoIsMoving
          }
        })
      ).toBeInstanceOf(expectedPageType)
    }
  )

  it('should not be visible or enabled when about section is NOT complete', () => {
    expect(MovementDetailsSection.config.isVisible({})).toBe(false)
  })

  it('should be visible and enabled when about section is complete', () => {
    expect(
      MovementDetailsSection.config.isEnabled({
        about: aboutSectionCompleteOtherMovement
      })
    ).toBe(true)
  })

  it('should not be visible or enabled when about is valid but slaughter-onsite', () => {
    expect(
      MovementDetailsSection.config.isEnabled({
        about: aboutSectionCompleteSlaughter
      })
    ).toBe(false)
  })
})
