import registeredKeeperPage from '../../page-objects/receiving-the-licence/registeredKeeperPage.js'
import responsibleForOriginPage from '../../page-objects/receiving-the-licence/responsibleForOriginPage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import checkAnswersPage from '../../page-objects/receiving-the-licence/checkAnswersPage.js'
import { navigateIfFirstPage } from '../function-helpers/navigateIfFirstPage.js'

export const LICENCE_RECIPIENT = {
  NOT_MILK: 'not-milk',
  MILK_PRODUCER: 'milk'
}

const DEFAULTS = {
  firstName: 'Jane',
  lastName: 'Doe',
  email: 'applicant@example.com'
}

export const completeReceivingLicenceSection = async ({
  recipient = LICENCE_RECIPIENT.NOT_MILK,
  firstName = DEFAULTS.firstName,
  lastName = DEFAULTS.lastName,
  email = DEFAULTS.email,
  startFromFirstPage = false
} = {}) => {
  const firstPage =
    recipient === LICENCE_RECIPIENT.MILK_PRODUCER
      ? responsibleForOriginPage
      : registeredKeeperPage

  await navigateIfFirstPage(startFromFirstPage, firstPage)

  if (recipient === LICENCE_RECIPIENT.MILK_PRODUCER) {
    await responsibleForOriginPage.inputTextAndContinue(
      firstName,
      lastName,
      emailPage
    )
  } else {
    await registeredKeeperPage.inputTextAndContinue(
      firstName,
      lastName,
      emailPage
    )
  }

  await emailPage.inputTextAndContinue(email, checkAnswersPage)
}

export const enumerateReceivingLicenceRoutes = () => [
  {
    name: 'Not milk → Registered keeper → Email → CYA',
    opts: { recipient: LICENCE_RECIPIENT.NOT_MILK }
  },
  {
    name: 'Milk producer → Responsible for origin → Email → CYA',
    opts: { recipient: LICENCE_RECIPIENT.MILK_PRODUCER }
  }
]
