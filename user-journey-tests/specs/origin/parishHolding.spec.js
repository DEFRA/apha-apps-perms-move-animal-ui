import { expect } from '@wdio/globals'
import ParishHoldingNumberPage from '../../page-objects/origin/parishHoldingNumberPage.js'
import newAddressPage from '../../page-objects/origin/newAddressPage.js'
import signInPage from '../../page-objects/signInPage.js'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

describe('Parish holding page test', () => {
  // eslint-disable-next-line no-undef
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
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should verify that page errors when letters are entered', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      'te/tes/test',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should verify that input automatically trims whitespace', async () => {
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      ' 12 / 345 / 6789 ',
      newAddressPage
    )
    await ParishHoldingNumberPage.navigateToPageAndVerifyTitle()
    const inputValue = await ParishHoldingNumberPage.cphNumberInput().getValue()
    expect(inputValue).toBe('12/345/6789')
  })

  it('Should verify that page errors when letters and spaces and numbers are included', async () => {
    await ParishHoldingNumberPage.parishHoldingErrorTest(
      '12 / tes / 67dh',
      ParishHoldingNumberPage.invalidFormatError
    )
  })

  it('Should input correct number format and continue without producing an error', async () => {
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      '12/345/6789',
      newAddressPage
    )
    await expect(
      ParishHoldingNumberPage.cphInputFieldError()
    ).not.toBeDisplayed()
    await expect(ParishHoldingNumberPage.errorSummary).not.toBeDisplayed()
  })

  it('Should choose an option and check its maintained', async () => {
    const validInput = '54/321/1234'
    await ParishHoldingNumberPage.inputParishHoldingNumberAndContinue(
      validInput,
      newAddressPage
    )
    await ParishHoldingNumberPage.navigateToPageAndVerifyTitle()
    const inputValue = await ParishHoldingNumberPage.cphNumberInput().getValue()
    expect(inputValue).toBe(validInput)
  })
})
