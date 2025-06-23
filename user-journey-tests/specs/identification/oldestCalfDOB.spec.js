// External helpers
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'
import { waitForPagePath } from '../../helpers/page.js'

// Page objects
import signInPage from '../../page-objects/signInPage.js'
import oldestCalfDobPage from '../../page-objects/identification/oldestCalfDobPage.js'
import earTagsCalvesPage from '../../page-objects/identification/earTagsCalvesPage.js'
import identificationWarningPage from '../../page-objects/identification/identificationWarningPage.js'

// Helper function
const formatDateObject = (date) => ({
  day: date.getDate().toString(),
  month: (date.getMonth() + 1).toString(),
  year: date.getFullYear().toString()
})

describe('Date Input Page Validation (single error shown)', () => {
  // eslint-disable-next-line no-undef
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await oldestCalfDobPage.navigateToPageAndVerifyTitle()
  })

  it('shows "no input" error when all fields are blank', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '', month: '', year: '' },
      oldestCalfDobPage.noInputError
    )
  })

  it('shows day error when day is missing', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '', month: '03', year: '2023' },
      oldestCalfDobPage.noDayError
    )
  })

  it('shows month error when month is missing', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '03', month: '', year: '2023' },
      oldestCalfDobPage.noMonthError,
      'month'
    )
  })

  it('shows year error when year is missing', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '03', month: '03', year: '' },
      oldestCalfDobPage.noYearError,
      'year'
    )
  })

  it('shows real date error when day is invalid', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '32', month: '03', year: '2023' },
      oldestCalfDobPage.dayFormatError
    )
  })

  it('shows month range error when month is over 12', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '10', month: '13', year: '2023' },
      oldestCalfDobPage.monthFormatError,
      'month'
    )
  })

  it('shows 4-digit year error when year is too short', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '10', month: '10', year: '23' },
      oldestCalfDobPage.yearDigitError,
      'year'
    )
  })

  it('prioritises no input over invalid errors', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '40', month: '', year: '23' },
      oldestCalfDobPage.noMonthError,
      'month'
    )
  })

  it('prioritises invalid errors over future date', async () => {
    await oldestCalfDobPage.dateErrorTest(
      { day: '40', month: '03', year: '2070' },
      oldestCalfDobPage.dayFormatError,
      'day'
    )
  })

  it('shows future date error when date is tomorrow', async () => {
    const tomorrow = new Date()
    await tomorrow.setDate(tomorrow.getDate() + 1)

    await oldestCalfDobPage.dateErrorTest(
      formatDateObject(tomorrow),
      oldestCalfDobPage.futureDateError
    )
  })

  it('navigates to recent page if date is within 35 days', async () => {
    const recentDate = new Date()
    recentDate.setDate(recentDate.getDate() - 20)

    await oldestCalfDobPage.enterDateAndContinue(formatDateObject(recentDate))
    await waitForPagePath(earTagsCalvesPage.pagePath)
  })

  it('navigates to older page if date is more than 35 days ago', async () => {
    const oldDate = new Date()
    oldDate.setDate(oldDate.getDate() - 40)

    await oldestCalfDobPage.enterDateAndContinue(formatDateObject(oldDate))
    await waitForPagePath(identificationWarningPage.pagePath)
  })
})
