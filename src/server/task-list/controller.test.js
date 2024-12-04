import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import { Origin } from '../common/model/section/origin.js'
import { withCsrfProtection } from '../common/test-helpers/csrf.js'
import { Destination } from '../common/model/section/destination.js'
import { License } from '../common/model/section/license.js'
import { Tests } from '../common/model/section/tests.js'

describe('#taskListController', () => {
  /** @type {Server} */
  let server

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject({
      method: 'GET',
      url: '/task-list'
    })

    expect(parseDocument(payload).title).toBe(
      'Your Bovine Tuberculosis (TB) movement licence application'
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should return the correct task list items', async () => {
    const { payload } = await server.inject({
      method: 'GET',
      url: '/task-list'
    })

    const document = parseDocument(payload)
    const taskTitles = Array.from(
      document.querySelectorAll('.govuk-task-list__name-and-hint')
    ).map((el) => el.textContent?.trim())

    expect(taskTitles).toEqual([
      'Movement origin',
      'Movement destination',
      'Tests',
      'Receiving the licence'
    ])
  })

  it('Should redirect to check-answers if all tasks are valid', async () => {
    // Mock the validation to return true for all the tasks (needed until we can have actual valid tasks)
    const mockValidValue = {
      validate: () => ({ isValid: true, errors: {} }),
      _data: {}
    }

    const mockValidOrigin = {
      ...mockValidValue,
      onOffFarm: 'any value',
      cphNumber: 'any value',
      address: 'any value'
    }

    const allSpies = [
      jest.spyOn(Origin, 'fromState').mockReturnValue(mockValidOrigin),
      jest.spyOn(Destination, 'fromState').mockReturnValue(mockValidValue),
      jest.spyOn(Tests, 'fromState').mockReturnValue(mockValidValue),
      jest.spyOn(License, 'fromState').mockReturnValue(mockValidValue)
    ]

    const { statusCode, headers } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/task-list'
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)

    expect(headers.location).toBe('/check-answers')

    allSpies.forEach((spy) => spy.mockRestore())
  })

  it('Should redirect to task-list-incomplete if any task is invalid', async () => {
    const originData = {
      onOffFarm: undefined,
      cphNumber: '12/345/6789',
      address: {
        addressLine1: 'Starfleet Headquarters',
        addressTown: 'San Francisco',
        addressPostcode: 'RG24 8RR'
      }
    }

    Origin.fromState(originData)

    const { statusCode, headers } = await server.inject(
      withCsrfProtection({
        method: 'POST',
        url: '/task-list'
      })
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe('/task-list-incomplete')
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
