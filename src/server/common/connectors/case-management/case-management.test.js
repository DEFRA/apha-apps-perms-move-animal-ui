import { ApplicationModel } from '../../model/application/application.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'
import { submitApplication } from './case-management.js'
import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'

describe('CaseManagement.submitApplication', () => {
  const application = ApplicationModel.fromState(validApplicationState)
  const { baseUrl, timeout } = config.get('caseManagementApi')
  let wreckMock

  beforeAll(() => {
    wreckMock = jest.spyOn(Wreck, 'post')
  })

  afterAll(jest.resetAllMocks)

  it('should send an application to the case management backend', async () => {
    const expectedResponse = { message: 'TB-1234-ABCD' }
    wreckMock.mockResolvedValue(
      /** @type {any} */ ({
        payload: JSON.stringify(expectedResponse)
      })
    )

    const response = await submitApplication(application)

    expect(Wreck.post).toHaveBeenCalledWith(baseUrl, {
      payload: application.caseManagementData,
      timeout
    })

    expect(response).toStrictEqual(expectedResponse)
  })

  it('should throw an error if Wreck errors', async () => {
    wreckMock.mockRejectedValue(new Error('any error'))
    const application = ApplicationModel.fromState(validApplicationState)
    await expect(submitApplication(application)).rejects.toThrow(
      'Failed to send application to case management API: any error'
    )
  })
})
