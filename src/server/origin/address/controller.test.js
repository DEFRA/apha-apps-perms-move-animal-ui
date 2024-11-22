import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import {
  testCsrfProtectedGet,
  testCsrfProtectedPost,
  withCsrfProtection
} from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'

import { pageTitle } from './controller.js'

describe('#originAddressController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  test('Should provide expected response', async () => {
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

  test('should redirect to self', async () => {
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

  test('Should display an error to the user if no value selected', async () => {
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
    test('Should display an error to the user if no value entered', async () => {
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

    test('Should display an error to the user if no value entered for address line 1', async () => {
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

    test('Should display an error to the user if no value entered for town/city', async () => {
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

    test('Should display an error to the user if no value entered for postcode', async () => {
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

  test('Should report malformed error on incorrect postcode', async () => {
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

  test('Should process input correctly with missing optional fields', async () => {
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

  test('Should report error for addressLine1 exceeding max length', async () => {
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

  test('Should process addressLine1 at max length correctly', async () => {
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

  test('Should process London postcodes correctly', async () => {
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
        addressLine1: '73 OCEANA CRESCENT',
        addressLine2: 'Archronos Ltd',
        addressTown: 'Basingstoke',
        addressCounty: 'Hampshire',
        addressPostcode: 'RG248RR'
      }
    }
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
