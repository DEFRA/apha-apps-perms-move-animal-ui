import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import {
  testCsrfProtectedGet,
  testCsrfProtectedPost,
  withCsrfProtection
} from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

import SessionTester from '~/src/server/common/test-helpers/session-helper.js'

const pageTitle =
  'What is the address of your farm or premises where the animals are moving off?'

describe('#originAddressController', () => {
  /** @type {Server} */
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTester.create(server)
    await session.setState('origin', {
      address: {
        addressLine1: 'Starfleet Headquarters',
        addressLine2: '24-593 Federation Drive',
        addressTown: 'San Francisco',
        addressCounty: 'San Francisco',
        addressPostcode: 'RG24 8RR'
      }
    })
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'GET',
        url: '/origin/address'
      })
    )

    const document = parseDocument(payload)
    expect(document.title).toBe(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should repopulate the form from state', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: '/origin/address'
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
    expect(payload).toEqual(
      expect.stringContaining(
        '<input class="govuk-input" id="addressLine1" name="addressLine1" type="text" value="Starfleet Headquarters" autocomplete="address-line1">'
      )
    )

    expect(payload).toEqual(
      expect.stringContaining(
        '<input class="govuk-input" id="addressLine2" name="addressLine2" type="text" value="24-593 Federation Drive" autocomplete="address-line2">'
      )
    )

    expect(payload).toEqual(
      expect.stringContaining(
        '<input class="govuk-input govuk-!-width-two-thirds" id="addressTown" name="addressTown" type="text" value="San Francisco" autocomplete="address-level2">'
      )
    )

    expect(payload).toEqual(
      expect.stringContaining(
        '<input class="govuk-input govuk-!-width-two-thirds" id="addressCounty" name="addressCounty" type="text" value="San Francisco">'
      )
    )

    expect(payload).toEqual(
      expect.stringContaining(
        '<input class="govuk-input govuk-input--width-10" id="addressPostcode" name="addressPostcode" type="text" value="RG24 8RR" autocomplete="postal-code">'
      )
    )
  })

  it('should redirect to self', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/address',
        payload: {
          addressLine1: 'Starfleet Headquarters',
          addressLine2: '24-593 Federation Drive',
          addressTown: 'San Francisco',
          addressCounty: 'San Francisco',
          addressPostcode: 'RG24 8RR'
        }
      })
    )

    expect(headers.location).toBe('/origin/summary')

    expect(statusCode).toBe(statusCodes.redirect)
  })

  it('Should display an error to the user if no value selected', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/address'
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
    expect(payload).toEqual(expect.stringContaining('There is a problem'))

    expect(statusCode).toBe(statusCodes.ok)
  })

  describe('When the user has not entered address details', () => {
    it('Should display an error to the user if no value entered', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin/address',
          payload: {}
        })
      )

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

      expect(payload).toEqual(expect.stringContaining('There is a problem'))
      expect(payload).toEqual(expect.stringContaining('Enter address line 1'))
      expect(payload).toEqual(expect.stringContaining('Enter town or city'))
      expect(payload).toEqual(expect.stringContaining('Enter postcode'))

      expect(statusCode).toBe(statusCodes.ok)
    })

    it('Should display an error to the user if no value entered for address line 1', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin/address',
          payload: {
            addressLine2: '24-593 Federation Drive',
            addressTown: 'San Francisco',
            addressCounty: 'San Francisco',
            addressPostcode: 'RG24 8RR'
          }
        })
      )

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

      expect(payload).toEqual(expect.stringContaining('There is a problem'))
      expect(payload).toEqual(expect.stringContaining('Enter address line 1'))
      expect(payload).toEqual(expect.not.stringContaining('Enter town or city'))
      expect(payload).toEqual(expect.not.stringContaining('Enter postcode'))

      expect(statusCode).toBe(statusCodes.ok)
    })

    it('Should display an error to the user if no value entered for town/city', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin/address',
          payload: {
            addressLine1: 'Starfleet Headquarters',
            addressLine2: '24-593 Federation Drive',
            addressCounty: 'San Francisco',
            addressPostcode: 'RG24 8RR'
          }
        })
      )

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

      expect(payload).toEqual(expect.stringContaining('There is a problem'))
      expect(payload).toEqual(
        expect.not.stringContaining('Enter address line 1')
      )
      expect(payload).toEqual(expect.stringContaining('Enter town or city'))
      expect(payload).toEqual(expect.not.stringContaining('Enter postcode'))

      expect(statusCode).toBe(statusCodes.ok)
    })

    it('Should display an error to the user if no value entered for postcode', async () => {
      const { payload, statusCode } = await server.inject(
        withCsrfProtection({
          method: 'POST',
          url: '/origin/address',
          payload: {
            addressLine1: 'Starfleet Headquarters',
            addressLine2: '24-593 Federation Drive',
            addressTown: 'San Francisco',
            addressCounty: 'San Francisco'
          }
        })
      )

      expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

      expect(payload).toEqual(expect.stringContaining('There is a problem'))
      expect(payload).toEqual(
        expect.not.stringContaining('Enter address line 1')
      )
      expect(payload).toEqual(expect.not.stringContaining('Enter town or city'))
      expect(payload).toEqual(expect.stringContaining('Enter postcode'))

      expect(statusCode).toBe(statusCodes.ok)
    })
  })

  it('Should report malformed error on incorrect postcode', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/address',
        payload: {
          addressLine1: 'Starfleet Headquarters',
          addressLine2: '24-593 Federation Drive',
          addressTown: 'San Francisco',
          addressCounty: 'San Francisco',
          addressPostcode: 'invalid format'
        }
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)

    expect(payload).toEqual(expect.stringContaining('There is a problem'))
    expect(payload).toEqual(expect.stringContaining('Enter a full UK postcode'))

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should process input correctly with missing optional fields', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/address',
        payload: {
          addressLine1: 'Starfleet Headquarters',
          addressTown: 'San Francisco',
          addressPostcode: 'sw1a1aa' // Valid UK postcode
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect) // Assuming a redirect on success
    expect(headers.location).toBe('/origin/summary')
  })

  it('Should report error for addressLine1 exceeding max length', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/address',
        payload: {
          addressLine1: 'A'.repeat(256), // Exceeding max length
          addressTown: 'San Francisco',
          addressPostcode: 'SW1A1AA' // Valid UK postcode
        }
      })
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
    expect(payload).toEqual(
      expect.stringContaining(
        'Address line 1 must be no longer than 255 characters'
      )
    )
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should process addressLine1 at max length correctly', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/address',
        payload: {
          addressLine1: 'A'.repeat(255), // Max length
          addressTown: 'San Francisco',
          addressPostcode: 'Sw1A 1AA' // Valid UK postcode
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect) // Assuming a redirect on success
    expect(headers.location).toBe('/origin/summary') // Check for redirect response
  })

  it('Should process London postcodes correctly', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/origin/address',
        payload: {
          addressLine1: 'A'.repeat(255), // Max length
          addressTown: 'San Francisco',
          addressPostcode: 'N10 1AA' // Valid UK postcode
        }
      })
    )

    expect(statusCode).toBe(statusCodes.redirect) // Assuming a redirect on success
    expect(headers.location).toBe('/origin/summary') // Check for redirect response
  })

  testCsrfProtectedGet(() => server, {
    method: 'GET',
    url: '/origin/address'
  })

  testCsrfProtectedPost(() => server, {
    method: 'POST',
    url: '/origin/address',
    payload: {
      originAddress: {
        addressLine1: 'Starfleet Headquarters',
        addressLine2: '24-593 Federation Drive',
        addressTown: 'San Francisco',
        addressCounty: 'San Francisco',
        addressPostcode: 'RG24 8RR'
      }
    }
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
