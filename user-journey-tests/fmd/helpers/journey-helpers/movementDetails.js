// Milk imports
import dairyNamePage from '../../page-objects/movement-details/milk/dairyNamePage.js'
import numberPlatePage from '../../page-objects/movement-details/milk/numberPlatePage.js'
import driverNamePage from '../../page-objects/movement-details/milk/driverNamePage.js'
import driverNumberPage from '../../page-objects/movement-details/milk/driverNumberPage.js'
import allPremisesPage from '../../page-objects/movement-details/milk/allPremisesPage.js'
import movementRepeatedPage from '../../page-objects/movement-details/milk/movementRepeatedPage.js'
import movementDatesPage from '../../page-objects/movement-details/milk/movementDatesPage.js'
import singleMovementDatePage from '../../page-objects/movement-details/milk/singleMovementDatePage.js'
import maxJourneysPage from '../../page-objects/movement-details/milk/maxJourneysPage.js'
import checkAnswersPage from '../../page-objects/movement-details/checkAnswersPage.js'

// Live animals imports
import maxDaysNeededPage from '../../page-objects/movement-details/live-animals/maxDaysNeededPage.js'
import maxJourneysNeededPage from '../../page-objects/movement-details/live-animals/maxJourneysNeededPage.js'
import movementStartDatePage from '../../page-objects/movement-details/live-animals/movementStartDatePage.js'
import endDatePage from '../../page-objects/movement-details/live-animals/endDatePage.js'

// Carcasses imports
import disposalDatePage from '../../page-objects/movement-details/carcasses/disposalDatePage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

// Milk helper
export const MILK_ROLE = { DAIRY: 'dairy', PRODUCER: 'producer' }

export const DEFAULTS = {
  dairyName: 'Acme Dairies Ltd',
  numberPlate: 'AB12 CDE',
  driverFirst: 'Alex',
  driverLast: 'Driver',
  driverPhone: '07123456789',
  premisesList: 'Farm A, Farm B, Farm C',
  repeatStartDate: { day: '07', month: '03', year: '2050' },
  singleDate: { day: '07', month: '03', year: '2050' },
  maxJourneys: '6'
}

export const completeMilkMovementSection = async ({
  role = MILK_ROLE.DAIRY,
  dairyName = DEFAULTS.dairyName,
  numberPlate = DEFAULTS.numberPlate,
  driverFirst = DEFAULTS.driverFirst,
  driverLast = DEFAULTS.driverLast,
  driverPhone = DEFAULTS.driverPhone,
  premisesList = DEFAULTS.premisesList,
  repeated = false,
  repeatStartDate = DEFAULTS.repeatStartDate,
  singleDate = DEFAULTS.singleDate,
  maxJourneys = DEFAULTS.maxJourneys,
  startFromFirstPage = false
} = {}) => {
  const firstPage =
    role === MILK_ROLE.DAIRY ? dairyNamePage : movementRepeatedPage
  await navigateIfFirstPage(startFromFirstPage, firstPage)

  if (role === MILK_ROLE.DAIRY) {
    await dairyNamePage.inputTextAndContinue(dairyName, numberPlatePage)
    await numberPlatePage.inputTextAndContinue(numberPlate, driverNamePage)
    await driverNamePage.inputTextAndContinue(
      driverFirst,
      driverLast,
      driverNumberPage
    )
    await driverNumberPage.inputTextAndContinue(driverPhone, allPremisesPage)
    await allPremisesPage.inputTextAndContinue(
      premisesList,
      movementRepeatedPage
    )
  }

  await movementRepeatedPage.selectRadioAndContinue(
    repeated ? 'yes' : 'no',
    repeated ? movementDatesPage : singleMovementDatePage
  )

  if (repeated) {
    await movementDatesPage.enterDateAndContinue(
      repeatStartDate,
      maxJourneysPage
    )
    await maxJourneysPage.inputTextAndContinue(maxJourneys, checkAnswersPage)
    return
  }

  await singleMovementDatePage.enterDateAndContinue(
    singleDate,
    checkAnswersPage
  )
}

export const enumerateMilkRoutes = () => [
  { name: 'Dairy → repeated', opts: { role: MILK_ROLE.DAIRY, repeated: true } },
  { name: 'Dairy → single', opts: { role: MILK_ROLE.DAIRY, repeated: false } },
  {
    name: 'Producer → repeated',
    opts: { role: MILK_ROLE.PRODUCER, repeated: true }
  },
  {
    name: 'Producer → single',
    opts: { role: MILK_ROLE.PRODUCER, repeated: false }
  }
]

// Live animals helper
export const DEFAULTS_LIVE = {
  maxDays: '5',
  maxJourneys: '8',
  startDate: { day: '07', month: '03', year: '2050' },
  endDate: { day: '21', month: '03', year: '2050' }
}

export const completeLiveAnimalsMovementSection = async ({
  maxDays = DEFAULTS_LIVE.maxDays,
  maxJourneys = DEFAULTS_LIVE.maxJourneys,
  startDate = DEFAULTS_LIVE.startDate,
  endDate = DEFAULTS_LIVE.endDate,
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, maxDaysNeededPage)

  await maxDaysNeededPage.inputTextAndContinue(maxDays, maxJourneysNeededPage)
  await maxJourneysNeededPage.inputTextAndContinue(
    maxJourneys,
    movementStartDatePage
  )
  await movementStartDatePage.enterDateAndContinue(startDate, endDatePage)
  await endDatePage.enterDateAndContinue(endDate, checkAnswersPage)
}

export const enumerateLiveAnimalsRoutes = () => [
  {
    name: 'Live animals → max days → max journeys → start date → end date',
    opts: {}
  }
]

// Carcasses helper
export const DEFAULTS_CARCASSES = {
  disposalDate: { day: '07', month: '03', year: '2050' }
}

export const completeCarcassesMovementSection = async ({
  disposalDate = DEFAULTS_CARCASSES.disposalDate,
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, disposalDatePage)
  await disposalDatePage.enterDateAndContinue(disposalDate, checkAnswersPage)
}

export const enumerateCarcassesRoutes = () => [
  { name: 'Carcasses → disposal date → CYA', opts: {} }
]
