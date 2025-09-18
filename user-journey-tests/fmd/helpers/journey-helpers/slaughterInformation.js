import slaughtermanOrKnackermanPage from '../../page-objects/slaughter-information/slaughtermanOrKnackermanPage.js'
import nameOfSlaughtermanPage from '../../page-objects/slaughter-information/nameOfSlaughtermanPage.js'
import slaughtermanNumberPage from '../../page-objects/slaughter-information/slaughtermanNumberPage.js'
import knackermanBusinessNamePage from '../../page-objects/slaughter-information/knackermanBusinessNamePage.js'
import knackermanNumberPage from '../../page-objects/slaughter-information/knackermanNumberPage.js'
import slaughterDatePage from '../../page-objects/slaughter-information/slaughterDatePage.js'
import checkAnswersPage from '../../page-objects/slaughter-information/checkAnswersPage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

export const PROVIDER = {
  SLAUGHTERMAN: 'slaughterman',
  KNACKERMAN: 'knackerman'
}

const DEFAULTS = {
  slaughtermanFirst: 'John',
  slaughtermanLast: 'Doe',
  slaughtermanPhone: '07123456789',
  knackermanBusiness: 'Acme Knackery Ltd',
  knackermanPhone: '01234567890',
  date: { day: '7', month: '3', year: '2050' }
}

export const completeSlaughterInformationSection = async ({
  provider = PROVIDER.SLAUGHTERMAN,
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, slaughtermanOrKnackermanPage)

  await slaughtermanOrKnackermanPage.selectRadioAndContinue(
    provider,
    provider === PROVIDER.SLAUGHTERMAN
      ? nameOfSlaughtermanPage
      : knackermanBusinessNamePage
  )

  if (provider === PROVIDER.SLAUGHTERMAN) {
    await nameOfSlaughtermanPage.inputTextAndContinue(
      DEFAULTS.slaughtermanFirst,
      DEFAULTS.slaughtermanLast,
      slaughtermanNumberPage
    )
    await slaughtermanNumberPage.inputTextAndContinue(
      DEFAULTS.slaughtermanPhone,
      slaughterDatePage
    )
  } else {
    await knackermanBusinessNamePage.inputTextAndContinue(
      DEFAULTS.knackermanBusiness,
      knackermanNumberPage
    )
    await knackermanNumberPage.inputTextAndContinue(
      DEFAULTS.knackermanPhone,
      slaughterDatePage
    )
  }

  await slaughterDatePage.enterDateAndContinue(DEFAULTS.date, checkAnswersPage)
}

export const enumerateSlaughterInfoRoutes = () => [
  { name: 'Slaughterman route', opts: { provider: PROVIDER.SLAUGHTERMAN } },
  { name: 'Knackerman route', opts: { provider: PROVIDER.KNACKERMAN } }
]
