import { Page } from './page.js'
import * as page from '../helpers/page.js'

const addressLineOneId = 'addressLine1'
const addressLineTwoId = 'addressLine2'
const townOrCityId = 'addressTown'
const countyId = 'addressCounty'
const postcodeId = 'addressPostcode'

class NewAddressPage extends Page {
  get newAddressPageTitle() {
    return 'What is the address of your farm or premises where the animals are moving off?'
  }

  get urlPath() {
    return 'origin-address'
  }

  async addressLineOneInput() {
    return super.getInputField(addressLineOneId)
  }

  async addressLineTwoInput() {
    return super.getInputField(addressLineTwoId)
  }

  async townOrCityInput() {
    return super.getInputField(townOrCityId)
  }

  async countyInput() {
    return super.getInputField(countyId)
  }

  async postcodeInput() {
    return super.getInputField(postcodeId)
  }

  async lineOneError() {
    return super.getErrorElement(addressLineOneId)
  }

  async lineTwoError() {
    return super.getErrorElement(addressLineTwoId)
  }

  async townOrCityError() {
    return super.getErrorElement(townOrCityId)
  }

  async countyError() {
    return super.getErrorElement(countyId)
  }

  async postcodeError() {
    return super.getErrorElement(postcodeId)
  }

  async lineOneErrorLink() {
    return super.getErrorLink(addressLineOneId)
  }

  async lineTwoErrorLink() {
    return super.getErrorLink(addressLineTwoId)
  }

  async townOrCityErrorLink() {
    return super.getErrorLink(townOrCityId)
  }

  async countyErrorLink() {
    return super.getErrorLink(countyId)
  }

  async postcodeErrorLink() {
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

  async getFieldMappings() {
    return {
      lineOne: await this.addressLineOneInput(),
      lineTwo: await this.addressLineTwoInput(),
      townOrCity: await this.townOrCityInput(),
      county: await this.countyInput(),
      postcode: await this.postcodeInput()
    }
  }

  async getErrorMappings() {
    return {
      lineOne: {
        element: await this.lineOneError(),
        message: this.lineOneErrorText,
        link: await this.lineOneErrorLink()
      },
      townOrCity: {
        element: await this.townOrCityError(),
        message: this.townOrCityErrorText,
        link: await this.townOrCityErrorLink()
      },
      noPostcode: {
        element: await this.postcodeError(),
        message: this.noPostcodeErrorText,
        link: await this.postcodeErrorLink()
      },
      invalidPostcode: {
        element: await this.postcodeError(),
        message: this.invalidPostcodeErrorText,
        link: await this.postcodeErrorLink()
      },
      lineOneMaxLength: {
        element: await this.lineOneError(),
        message: this.maxErrorLengthText('Address line 1'),
        link: await this.lineOneErrorLink()
      },
      lineTwoMaxLength: {
        element: await this.lineTwoError(),
        message: this.maxErrorLengthText('Address line 2'),
        link: await this.lineTwoErrorLink()
      },
      townOrCityMaxLength: {
        element: await this.townOrCityError(),
        message: this.maxErrorLengthText('Address town'),
        link: await this.townOrCityErrorLink()
      },
      countyMaxLength: {
        element: await this.countyError(),
        message: this.maxErrorLengthText('Address county'),
        link: await this.countyErrorLink()
      }
    }
  }

  async verifyNewAddressErrors(fields = []) {
    const errorMappings = await this.getErrorMappings()

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

  async fillFormFieldsAndSubmit(fields = {}) {
    for (const [field, value] of Object.entries(fields)) {
      const fieldMappings = await this.getFieldMappings()
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
    for (const [field, expectedValue] of Object.entries(expectedValues)) {
      const fieldMappings = await this.getFieldMappings()
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
