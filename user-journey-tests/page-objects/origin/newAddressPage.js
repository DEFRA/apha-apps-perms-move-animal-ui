import { Page } from '../page.js'
import * as page from '../../helpers/page.js'

const addressLineOneId = 'addressLine1'
const addressLineTwoId = 'addressLine2'
const townOrCityId = 'addressTown'
const countyId = 'addressCounty'
const postcodeId = 'addressPostcode'

class NewAddressPage extends Page {
  get urlPath() {
    return 'origin/address'
  }

  get pageTitle() {
    return 'What is the address of your farm or premises where the animals are moving off?'
  }

  addressLineOneInput() {
    return super.getInputField(addressLineOneId)
  }

  addressLineTwoInput() {
    return super.getInputField(addressLineTwoId)
  }

  townOrCityInput() {
    return super.getInputField(townOrCityId)
  }

  countyInput() {
    return super.getInputField(countyId)
  }

  postcodeInput() {
    return super.getInputField(postcodeId)
  }

  lineOneError() {
    return super.getErrorElement(addressLineOneId)
  }

  lineTwoError() {
    return super.getErrorElement(addressLineTwoId)
  }

  townOrCityError() {
    return super.getErrorElement(townOrCityId)
  }

  countyError() {
    return super.getErrorElement(countyId)
  }

  postcodeError() {
    return super.getErrorElement(postcodeId)
  }

  lineOneErrorLink() {
    return super.getErrorLink(addressLineOneId)
  }

  lineTwoErrorLink() {
    return super.getErrorLink(addressLineTwoId)
  }

  townOrCityErrorLink() {
    return super.getErrorLink(townOrCityId)
  }

  countyErrorLink() {
    return super.getErrorLink(countyId)
  }

  postcodeErrorLink() {
    return super.getErrorLink(postcodeId)
  }

  get lineOneErrorText() {
    return 'Enter address line 1, typically the building and street'
  }

  get townOrCityErrorText() {
    return 'Enter town or city'
  }

  get noPostcodeErrorText() {
    return 'Enter postcode'
  }

  get invalidPostcodeErrorText() {
    return 'Enter a full UK postcode'
  }

  maxErrorLengthText(addressField) {
    return `${addressField} must be no longer than 255 characters`
  }

  getFieldMappings() {
    return {
      lineOne: this.addressLineOneInput(),
      lineTwo: this.addressLineTwoInput(),
      townOrCity: this.townOrCityInput(),
      county: this.countyInput(),
      postcode: this.postcodeInput()
    }
  }

  getErrorMappings() {
    return {
      lineOne: {
        element: this.lineOneError(),
        message: this.lineOneErrorText,
        link: this.lineOneErrorLink()
      },
      townOrCity: {
        element: this.townOrCityError(),
        message: this.townOrCityErrorText,
        link: this.townOrCityErrorLink()
      },
      noPostcode: {
        element: this.postcodeError(),
        message: this.noPostcodeErrorText,
        link: this.postcodeErrorLink()
      },
      invalidPostcode: {
        element: this.postcodeError(),
        message: this.invalidPostcodeErrorText,
        link: this.postcodeErrorLink()
      },
      lineOneMaxLength: {
        element: this.lineOneError(),
        message: this.maxErrorLengthText('Address line 1'),
        link: this.lineOneErrorLink()
      },
      lineTwoMaxLength: {
        element: this.lineTwoError(),
        message: this.maxErrorLengthText('Address line 2'),
        link: this.lineTwoErrorLink()
      },
      townOrCityMaxLength: {
        element: this.townOrCityError(),
        message: this.maxErrorLengthText('Address town'),
        link: this.townOrCityErrorLink()
      },
      countyMaxLength: {
        element: this.countyError(),
        message: this.maxErrorLengthText('Address county'),
        link: this.countyErrorLink()
      }
    }
  }

  async verifyNewAddressErrors(fields = []) {
    const errorMappings = this.getErrorMappings()
    for (const field of fields) {
      const error = errorMappings[field]

      if (error && error.element) {
        const message = error.message
        const link = error.link
        await super.verifyErrorsOnPage(error.element, message) // Verify the error element
        await super.verifySummaryErrorLink(link, error.element) // Verify the summary error link
      } else {
        throw new Error(`No error mapping found for field: ${field}`)
      }
    }
  }

  async clearFormFields(fields = {}) {
    const fieldMappings = this.getFieldMappings()
    for (const [field, value] of Object.entries(fields)) {
      const fieldElement = fieldMappings[field]

      if (value !== undefined && fieldElement) {
        await page.clearElement(fieldElement)
      } else if (!fieldElement) {
        throw new Error(`Invalid field: ${field}`)
      }
    }
  }

  async fillFormFieldsAndSubmit(fields = {}) {
    const fieldMappings = this.getFieldMappings()
    for (const [field, value] of Object.entries(fields)) {
      const fieldElement = fieldMappings[field]

      if (value !== undefined && fieldElement) {
        await page.typeIntoElement(fieldElement, value)
      } else if (!fieldElement) {
        throw new Error(`Invalid field: ${field}`)
      }
    }

    await super.selectContinue()
  }

  async verifyNoErrorsVisible() {
    const errors = [
      await this.lineOneError(),
      await this.townOrCityError(),
      await this.postcodeError()
    ]

    await super.verifyErrorsNotVisible(errors)
  }

  async verifyFieldValues(expectedValues = {}) {
    const fieldMappings = this.getFieldMappings()
    for (const [field, expectedValue] of Object.entries(expectedValues)) {
      const fieldElement = fieldMappings[field]

      if (!fieldElement) {
        throw new Error(
          `Field '${field}' is not defined in the field mappings.`
        )
      }

      const actualValue = await fieldElement.getValue()

      if (actualValue !== expectedValue) {
        throw new Error(
          `Value mismatch for field '${field}': Expected '${expectedValue}', but got '${actualValue}'.`
        )
      }
    }
  }
}

export default new NewAddressPage()
