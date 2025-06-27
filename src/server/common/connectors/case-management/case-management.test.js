import { statusCodes } from '../../constants/status-codes.js'
import { TbApplicationModel } from '../../../tb/application.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'
import { submitApplication } from './case-management.js'
import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'

describe('CaseManagement.submitApplication', () => {
  const application = TbApplicationModel.fromState(validApplicationState)
  const { baseUrl, timeout } = config.get('caseManagementApi')
  let wreckMock

  beforeAll(() => {
    wreckMock = jest.spyOn(Wreck, 'post')
  })

  afterAll(jest.resetAllMocks)

  it('should send an application to the case management backend', async () => {
    const expectedResponse = {
      message: 'TB-1234-ABCD'
    }

    wreckMock.mockResolvedValue(
      /** @type {any} */ ({
        payload: JSON.stringify(expectedResponse),
        res: { statusCode: statusCodes.ok }
      })
    )

    const response = await submitApplication(application)

    expect(Wreck.post).toHaveBeenCalledWith(`${baseUrl}/submit`, {
      payload: application.caseManagementData,
      timeout
    })

    expect(response).toStrictEqual({
      payload: expectedResponse,
      statusCode: 200
    })
  })
})
