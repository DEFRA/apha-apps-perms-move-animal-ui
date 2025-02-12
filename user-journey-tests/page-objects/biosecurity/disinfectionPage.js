import { Page } from '../page.js'
import { waitForPagePath } from '../../helpers/page.js'
import * as page from '../../helpers/page.js'

const pageId = 'peopleDisinfection'

const pageHeadingAndTitle =
  'What measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle?'

class DisinfectionPage extends Page {
  pagePath = 'biosecurity/people-disinfection'
  pageTitle = pageHeadingAndTitle
  pageHeading = pageHeadingAndTitle

  noInputError =
    'Enter what measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle'

  peopleDisinfectionInput() {
    return super.getInputField(pageId)
  }

  peopleDisinfectionFieldError() {
    return super.getErrorElement(pageId)
  }

  peopleDisinfectioErrorLink() {
    return super.getErrorLink(pageId)
  }

  async inputPeopleDisinfectionAndContinue(text, newPage) {
    await page.typeIntoElement(this.peopleDisinfectionInput(), text)
    await super.selectContinue()
    if (newPage) {
      await waitForPagePath(newPage.pagePath)
    }
  }

  async peopleDisinfectionErrorTest(textInput, errorMessage) {
    await this.inputPeopleDisinfectionAndContinue(textInput)
    await super.verifyErrorsOnPage(
      this.peopleDisinfectionFieldError(),
      errorMessage
    )
    await super.verifySummaryErrorLink(
      this.peopleDisinfectioErrorLink(),
      this.peopleDisinfectionInput()
    )
    const inputValue = await this.peopleDisinfectionInput().getValue()
    expect(inputValue).toBe(textInput)
  }
}

export default new DisinfectionPage()
