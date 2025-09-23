// Carcasses imports
import carcassDestinationPage from '../../page-objects/movement-destination/carcasses/carcassDestinationPage.js'
import youMovingPage from '../../page-objects/movement-destination/carcasses/youMovingPage.js'
import thirdPartyNamePage from '../../page-objects/movement-destination/carcasses/thirdPartyNamePage.js'
import businessNamePage from '../../page-objects/movement-destination/carcasses/businessNamePage.js'
import businessNumberPage from '../../page-objects/movement-destination/carcasses/businessNumberPage.js'
import addressYesNoPage from '../../page-objects/movement-destination/carcasses/addressYesNoPage.js'
import destinationAddressPage from '../../page-objects/movement-destination/carcasses/destinationAddressPage.js'
import cphYesNoPage from '../../page-objects/movement-destination/carcasses/cphYesNoPage.js'
import cphInputPage from '../../page-objects/movement-destination/carcasses/cphInputPage.js'
import checkAnswersPage from '../../page-objects/movement-destination/checkAnswersPage.js'

// Live animals imports
import abattoirNamePage from '../../page-objects/movement-destination/liveAnimals/abattoirNamePage.js'
import abattoirAddressPage from '../../page-objects/movement-destination/liveAnimals/abattoirAddressPage.js'
import tlaYesNoPage from '../../page-objects/movement-destination/liveAnimals/tlaYesNoPage.js'
import tlaInputPage from '../../page-objects/movement-destination/liveAnimals/tlaInputPage.js'
import animalDestinationPage from '../../page-objects/movement-destination/liveAnimals/animalDestinationPage.js'
import animalCPHPage from '../../page-objects/movement-destination/liveAnimals/animalCPHPage.js'
import animalAddressPage from '../../page-objects/movement-destination/liveAnimals/animalAddressPage.js'

// Milk imports
import milkPurchaserPage from '../../page-objects/movement-destination/milk/milkPurchaserPage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

export const CARCASS_DESTINATION = {
  KNACKERY: 'knackers-yard',
  RENDERING_PLANT: 'rendering-plant',
  INCINERATOR: 'incinerator',
  HUNT_KENNEL: 'hunt-kennel'
}

export const MOVER = { YOU: 'you', THIRD_PARTY: 'third-party' }

const DEFAULTS = {
  destination: CARCASS_DESTINATION.RENDERING_PLANT,
  mover: MOVER.YOU,
  thirdPartyName: 'Acme Haulage Ltd',
  businessName: 'Acme Processing Ltd',
  businessPhone: '01234567890',
  knowAddress: true,
  address: {
    lineOne: '1 Processing Way',
    lineTwo: 'Estate',
    townOrCity: 'Testtown',
    county: 'Testshire',
    postcode: 'TE1 1ST'
  },
  hasCph: true,
  cph: '12/345/6789'
}

export const completeMovementDestinationCarcasses = async ({
  destination = DEFAULTS.destination,
  mover = DEFAULTS.mover,
  thirdPartyName = DEFAULTS.thirdPartyName,
  businessName = DEFAULTS.businessName,
  businessPhone = DEFAULTS.businessPhone,
  knowAddress = DEFAULTS.knowAddress,
  address = DEFAULTS.address,
  hasCph = DEFAULTS.hasCph,
  cph = DEFAULTS.cph,
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, carcassDestinationPage)

  await carcassDestinationPage.selectRadioAndContinue(
    destination,
    youMovingPage
  )

  if (mover === MOVER.YOU) {
    await youMovingPage.selectRadioAndContinue('yes', businessNamePage)
  } else {
    await youMovingPage.selectRadioAndContinue('no', thirdPartyNamePage)
    await thirdPartyNamePage.inputTextAndContinue(
      thirdPartyName,
      businessNamePage
    )
  }

  await businessNamePage.inputTextAndContinue(businessName, businessNumberPage)
  await businessNumberPage.inputTextAndContinue(businessPhone, addressYesNoPage)

  await addressYesNoPage.selectRadioAndContinue(
    knowAddress ? 'yes' : 'no',
    knowAddress ? destinationAddressPage : cphYesNoPage
  )
  if (knowAddress) {
    await destinationAddressPage.fillFormFieldsAndSubmit(address, cphYesNoPage)
  }

  await cphYesNoPage.selectRadioAndContinue(
    hasCph ? 'yes' : 'no',
    hasCph ? cphInputPage : checkAnswersPage
  )

  if (hasCph) {
    await cphInputPage.inputParishHoldingNumberAndContinue(
      cph,
      checkAnswersPage
    )
  }
}

export const enumerateCarcassDestinationRoutes = () => [
  {
    name: 'Rendering plant • You moving • Know address • With CPH',
    opts: {
      destination: CARCASS_DESTINATION.RENDERING_PLANT,
      mover: MOVER.YOU,
      knowAddress: true,
      hasCph: true
    }
  },
  {
    name: 'Incinerator • Third party • No address • No CPH',
    opts: {
      destination: CARCASS_DESTINATION.INCINERATOR,
      mover: MOVER.THIRD_PARTY,
      thirdPartyName: 'Third Party Movers',
      knowAddress: false,
      hasCph: false
    }
  }
]

export const DESTINATION = {
  FARM: 'farm',
  SMALLHOLDING: 'smallholding',
  RESIDENTIAL_SMALLHOLDING: 'residential-smallholding',
  OTHER: 'another-premises'
}

const LIVE_DEFAULTS = {
  abattoirName: 'Acme Abattoir',
  abattoirAddress: {
    lineOne: '1 Abattoir Road',
    lineTwo: 'Unit 4',
    townOrCity: 'Testford',
    county: 'Testshire',
    postcode: 'TE1 1ST'
  },
  hasTla: false,
  tla: '12/345/6789',
  destinationType: DESTINATION.FARM,
  cph: '12/345/6789',
  destinationAddress: {
    lineOne: '1 Destination Lane',
    lineTwo: 'Yard 2',
    townOrCity: 'Destown',
    county: 'Destshire',
    postcode: 'DE1 1ST'
  }
}

// Live animals
export const completeLiveAnimalsDestination = async ({
  slaughter,
  hasTla = LIVE_DEFAULTS.hasTla,
  tla = LIVE_DEFAULTS.tla,
  destinationType = LIVE_DEFAULTS.destinationType,
  cph = LIVE_DEFAULTS.cph,
  destinationAddress = LIVE_DEFAULTS.destinationAddress,
  abattoirName = LIVE_DEFAULTS.abattoirName,
  abattoirAddress = LIVE_DEFAULTS.abattoirAddress,
  startFromFirstPage = false
} = {}) => {
  if (slaughter) {
    await navigateIfFirstPage(startFromFirstPage, abattoirNamePage)
    await abattoirNamePage.inputTextAndContinue(
      abattoirName,
      abattoirAddressPage
    )
    await abattoirAddressPage.fillFormFieldsAndSubmit(
      abattoirAddress,
      checkAnswersPage
    )
    return
  }

  await navigateIfFirstPage(startFromFirstPage, tlaYesNoPage)
  await tlaYesNoPage.selectRadioAndContinue(
    hasTla ? 'yes' : 'no',
    hasTla ? tlaInputPage : animalDestinationPage
  )

  if (hasTla) {
    await tlaInputPage.inputTextAndContinue(tla, animalDestinationPage)
  }

  await animalDestinationPage.selectRadioAndContinue(
    destinationType,
    animalCPHPage
  )
  await animalCPHPage.inputParishHoldingNumberAndContinue(
    cph,
    animalAddressPage
  )
  await animalAddressPage.fillFormFieldsAndSubmit(
    destinationAddress,
    checkAnswersPage
  )
}

export const enumerateLiveAnimalsDestinationRoutes = () => [
  { name: 'Live animals → Slaughter (abattoir)', opts: { slaughter: true } },
  {
    name: 'Live animals → Not slaughter (no TLA)',
    opts: { slaughter: false, hasTla: false }
  },
  {
    name: 'Live animals → Not slaughter (with TLA)',
    opts: { slaughter: false, hasTla: true }
  }
]

// Milk
export const completeMovementDestinationMilk = async ({
  purchaser = DEFAULTS.purchaser,
  startFromFirstPage = false
} = {}) => {
  await navigateIfFirstPage(startFromFirstPage, milkPurchaserPage)
  await milkPurchaserPage.inputTextAndContinue(purchaser, checkAnswersPage)
}

export const enumerateMovementDestinationMilkRoutes = () => [
  {
    name: 'Milk producer → Milk purchaser → CYA',
    opts: { purchaser: DEFAULTS.purchaser }
  }
]
