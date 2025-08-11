import animalResponsiblePage from '../../page-objects/receiving-the-licence/animalsResponsiblePage.js'
import productResponsiblePage from '../../page-objects/receiving-the-licence/productResponsiblePage.js'
import whoIsResponsiblePage from '../../page-objects/receiving-the-licence/whoIsResponsiblePage.js'
import emailPage from '../../page-objects/receiving-the-licence/emailPage.js'
import checkAnswersPage from '../../page-objects/receiving-the-licence/checkAnswersPage.js'

export const completeReceivingLicenceSection = async ({
  route = 'animal', // 'animal' | 'product' | 'visit'
  firstName = 'FirstName',
  lastName = 'LastName',
  email = 'eoin.corr@esynergy.co.uk',
  startFromFirstPage = false
} = {}) => {
  let firstPage

  switch (route) {
    case 'animal':
      firstPage = animalResponsiblePage
      break
    case 'product':
      firstPage = productResponsiblePage
      break
    case 'visit':
      firstPage = whoIsResponsiblePage
      break
    default:
      throw new Error(`Unknown receiving licence route: ${route}`)
  }

  if (startFromFirstPage) {
    await firstPage.navigateToPageAndVerifyTitle()
  }

  await firstPage.inputTextAndContinue(firstName, lastName, emailPage)
  await emailPage.inputTextAndContinue(email, checkAnswersPage)
}
