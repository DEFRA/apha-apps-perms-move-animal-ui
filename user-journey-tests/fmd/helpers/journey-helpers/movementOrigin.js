import tlaYesNoPage from '../../page-objects/movement-origin/tlaYesNoPage.js'
import tlaValuePage from '../../page-objects/movement-origin/tlaValuePage.js'
import typeOfPremisesPage from '../../page-objects/movement-origin/typeOfPremisesPage.js'
import originCPHPage from '../../page-objects/movement-origin/originCPHPage.js'
import originAddressPage from '../../page-objects/movement-origin/originAddressPage.js'
import gridReferencePage from '../../page-objects/movement-origin/gridReferencePage.js'
import whatAnimalsKeptPage from '../../page-objects/movement-origin/whatAnimalsKeptPage.js'
import otherClovenHoovedPage from '../../page-objects/movement-origin/otherClovenHoovedPage.js'
import checkAnswersPage from '../../page-objects/movement-origin/checkAnswersPage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

export const ORIGIN_ROUTE = { MILK: 'milk', NOT_MILK: 'not-milk' }

export const PREMISES = {
  FARM: 'farm',
  SMALLHOLDING: 'smallholding',
  RESIDENTIAL_SMALLHOLDING: 'residential-smallholding',
  OTHER: 'another-premises'
}

export const ANIMALS = {
  CATTLE: 'cattle',
  SHEEP: 'sheep',
  GOATS: 'goats',
  PIGS: 'pigs',
  CAMELIDS: 'camelids',
  OTHER: 'other',
  NONE: 'noneabove'
}

const DEFAULTS = {
  tla: '12/345/6789',
  premisesType: PREMISES.FARM,
  cph: '12/345/6789',
  address: {
    lineOne: '1 Test Lane',
    lineTwo: 'line 2',
    townOrCity: 'Testtown',
    county: 'Testshire',
    postcode: 'TE1 1ST'
  },
  gridRef: 'ST 12345 67890',
  animalsSelections: [ANIMALS.CATTLE],
  otherAnimalsText: 'Bison'
}

const goToAnimalsThenCya = async (animalsSelections, otherAnimalsText) => {
  const picks = Array.isArray(animalsSelections)
    ? animalsSelections
    : [animalsSelections]
  const hasOther = picks.includes(ANIMALS.OTHER)

  const elements = picks.map((id) => {
    const el = whatAnimalsKeptPage[id]
    if (!el) throw new Error(`Unknown checkbox id: ${id}`)
    return el
  })

  await whatAnimalsKeptPage.selectCheckboxesAndContinue(
    elements,
    hasOther ? otherClovenHoovedPage : checkAnswersPage
  )

  if (hasOther) {
    await otherClovenHoovedPage.inputTextAndContinue(
      otherAnimalsText,
      checkAnswersPage
    )
  }
}

export const completeMovementOriginSection = async ({
  route = ORIGIN_ROUTE.MILK,
  hasTla = false,
  slaughterOrCarcass = false,
  tla = DEFAULTS.tla,
  premisesType = DEFAULTS.premisesType,
  cph = DEFAULTS.cph,
  address = DEFAULTS.address,
  gridRef = DEFAULTS.gridRef,
  animalsSelections = DEFAULTS.animalsSelections,
  otherAnimalsText = DEFAULTS.otherAnimalsText,
  startFromFirstPage = false
} = {}) => {
  if (route === ORIGIN_ROUTE.MILK) {
    await navigateIfFirstPage(startFromFirstPage, typeOfPremisesPage)
    await typeOfPremisesPage.selectRadioAndContinue(premisesType, originCPHPage)
    await originCPHPage.inputParishHoldingNumberAndContinue(
      cph,
      originAddressPage
    )
    await originAddressPage.fillFormFieldsAndSubmit(address, checkAnswersPage)
    return
  }

  await navigateIfFirstPage(startFromFirstPage, tlaYesNoPage)
  await tlaYesNoPage.selectRadioAndContinue(
    hasTla ? 'yes' : 'no',
    hasTla ? tlaValuePage : typeOfPremisesPage
  )

  if (hasTla) {
    if (slaughterOrCarcass) {
      await tlaValuePage.inputTextAndContinue(tla, gridReferencePage)
      await gridReferencePage.inputTextAndContinue(gridRef, whatAnimalsKeptPage)
    } else {
      await tlaValuePage.inputTextAndContinue(tla, whatAnimalsKeptPage)
    }
  } else {
    await typeOfPremisesPage.selectRadioAndContinue(premisesType, originCPHPage)
    await originCPHPage.inputParishHoldingNumberAndContinue(
      cph,
      originAddressPage
    )

    if (slaughterOrCarcass) {
      await originAddressPage.fillFormFieldsAndSubmit(
        address,
        gridReferencePage
      )
      await gridReferencePage.inputTextAndContinue(gridRef, whatAnimalsKeptPage)
    } else {
      await originAddressPage.fillFormFieldsAndSubmit(
        address,
        whatAnimalsKeptPage
      )
    }
  }

  await goToAnimalsThenCya(animalsSelections, otherAnimalsText)
}

export const enumerateMovementOriginRoutes = () => [
  { name: 'Milk producer', opts: { route: ORIGIN_ROUTE.MILK } },
  {
    name: 'Not milk – No TLA – Not slaughter/carcass',
    opts: {
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: false,
      slaughterOrCarcass: false
    }
  },
  {
    name: 'Not milk – No TLA – Slaughter/carcass',
    opts: {
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: false,
      slaughterOrCarcass: true
    }
  },
  {
    name: 'Not milk – TLA – Not slaughter/carcass',
    opts: {
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: true,
      slaughterOrCarcass: false
    }
  },
  {
    name: 'Not milk – TLA – Slaughter/carcass',
    opts: {
      route: ORIGIN_ROUTE.NOT_MILK,
      hasTla: true,
      slaughterOrCarcass: true
    }
  }
]
