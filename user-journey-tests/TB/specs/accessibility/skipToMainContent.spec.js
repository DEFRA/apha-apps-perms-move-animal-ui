import { expect } from '@wdio/globals'
import {
  loginAndSaveSession,
  restoreSession
} from '../../helpers/authSessionManager.js'

import signInPage from '../../page-objects/signInPage.js'
import toFromFarmPage from '../../page-objects/origin/toFromFarmPage.js'
import originTypePage from '../../page-objects/origin/originTypePage.js'
import checkAnswersPage from '../../page-objects/origin/checkAnswersPage.js'

import completeOriginTaskAnswers from '../../helpers/testHelpers/movementOrigin.js'
import { selectElement, waitForPagePath } from '../../helpers/page.js'

const expectUrlEndsWithHash = async () => {
  const url = await browser.getUrl()
  expect(url).toMatch(/#main-content$/)
}

const expectUrlDoesNotEndWithHash = async () => {
  const url = await browser.getUrl()
  expect(url).not.toMatch(/#main-content$/)
}

const activateSkipLinkAndVerifyHash = async () => {
  await toFromFarmPage.selectSkipToMainContentLink()
  await expectUrlEndsWithHash()
}

describe('To/From Farm Page – Skip link and redirect behaviour', () => {
  
  before(async () => {
    await loginAndSaveSession(signInPage)
  })

  beforeEach(async () => {
    await restoreSession()
    await toFromFarmPage.navigateToPageAndVerifyTitle()
  })

  it('should add #main-content to the URL when skip link is activated', async () => {
    await activateSkipLinkAndVerifyHash()
  })

  it('should remove #main-content from the URL after form submission', async () => {
    await activateSkipLinkAndVerifyHash()
    await toFromFarmPage.selectOffFarmAndContinue(originTypePage)
    await expectUrlDoesNotEndWithHash()
  })

  it('should not retain #main-content in URL after using a change link', async () => {
    await completeOriginTaskAnswers()
    await selectElement(checkAnswersPage.getChangeLink('onOffFarm'))
    // not sure why but the following 2 lines seem to resolve an issue with this test in safari
    // I can see why the second one is required but not the first one
    await browser.getUrl()
    await waitForPagePath(toFromFarmPage.pagePath)
    await activateSkipLinkAndVerifyHash()
    await toFromFarmPage.selectOffFarmAndContinue(checkAnswersPage)
    await expectUrlDoesNotEndWithHash()
  })
})
