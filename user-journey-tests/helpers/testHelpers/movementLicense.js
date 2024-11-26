import landingPage from '../../page-objects/landingPage.js'
import toFromFarmPage from '../../page-objects/toFromFarmPage.js'
import parishHoldingNumberPage from '../../page-objects/parishHoldingNumberPage.js'
import newAddressPage from '../../page-objects/newAddressPage.js'

const lineOne = '37 Made up lane'
const townOrCity = 'Gotham'
const postcode = 'SW1A2AA'

const completeTaskListOneAnswers = async () => {
  await landingPage.verifyStartNowButton('Start now', true)
  await toFromFarmPage.selectOffFarmAndContinue()
  await parishHoldingNumberPage.inputParishHoldingNumberAndContinue(
    '12/345/6789'
  )
  await newAddressPage.fillFormFieldsAndSubmit({
    lineOne,
    townOrCity,
    postcode
  })
}

export default completeTaskListOneAnswers
