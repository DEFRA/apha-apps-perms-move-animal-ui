import { Page } from '../shared/page.js'
import * as page from '../shared/page-helpers.js'

const addressLineOneId = 'addressLine1'
const addressLineTwoId = 'addressLine2'
const townOrCityId = 'addressTown'
const countyId = 'addressCounty'
const postcodeId = 'addressPostcode'

class AddressBasePage extends Page {
  lineOneErrorText = 'Enter address line 1, typically the building and street'
  townOrCityErrorText = 'Enter town or city'
  noPostcodeErrorText = 'Enter postcode'
  invalidPostcodeErrorText = 'Enter a full UK postcode'

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
        target: this.addressLineOneInput(),
        element: this.lineOneError(),
        message: this.lineOneErrorText,
        link: this.lineOneErrorLink()
      },
      townOrCity: {
        target: this.townOrCityInput(),
        element: this.townOrCityError(),
        message: this.townOrCityErrorText,
        link: this.townOrCityErrorLink()
      },
      noPostcode: {
        target: this.postcodeInput(),
        element: this.postcodeError(),
        message: this.noPostcodeErrorText,
        link: this.postcodeErrorLink()
      },
      invalidPostcode: {
        target: this.postcodeInput(),
        element: this.postcodeError(),
        message: this.invalidPostcodeErrorText,
        link: this.postcodeErrorLink()
      },
      lineOneMaxLength: {
        target: this.addressLineOneInput(),
        element: this.lineOneError(),
        message: this.maxErrorLengthText('Address line 1'),
        link: this.lineOneErrorLink()
      },
      lineTwoMaxLength: {
        target: this.addressLineTwoInput(),
        element: this.lineTwoError(),
        message: this.maxErrorLengthText('Address line 2'),
        link: this.lineTwoErrorLink()
      },
      townOrCityMaxLength: {
        target: this.townOrCityInput(),
        element: this.townOrCityError(),
        message: this.maxErrorLengthText('Address town'),
        link: this.townOrCityErrorLink()
      },
      countyMaxLength: {
        target: this.countyInput(),
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
        await super.verifyErrorsOnPage(error.element, message)
        await super.verifySummaryErrorLink(link, error.target)
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

  async fillFormFieldsAndSubmit(fields = {}, nextPage) {
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
    if (nextPage) await page.waitForPagePath(nextPage.pagePath)
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

export { AddressBasePage }
