import ParishHoldingNumberPage from '../../../page-objects/origin/parishHoldingNumberPage.js'
import signInPage from '../../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../../helpers/authSessionManager.js'

describe('Parish holding page test', () => {
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach('Restore session and navigate to page', async () => {
    await restoreSession()
    await ParishHoldingNumberPage.navigateToPageAndVerifyTitle()
  })

  it('Should verify that page errors when nothing is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '',
      ParishHoldingNumberPage.noInputError
    )
  })

  it('Should verify that page errors when not enough is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12/345/678',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should verify that page errors when too much is entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12/345/67891',
      ParishHoldingNumberPage.invalidFormatErrorLong
    )
  })

  it('Should verify that page errors when letters are entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      'te/tes/test',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should verify that page errors when letters and spaces and numbers are included', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12 / tes / 67dh',
      ParishHoldingNumberPage.invalidFormatErrorLong
    )
  })
})
