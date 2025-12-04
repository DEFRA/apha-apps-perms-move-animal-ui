import { statusCodes } from '../../constants/status-codes.js'
import { TbApplicationModel } from '../../../tb/application.js'
import { validApplicationState } from '../../test-helpers/journey-state.js'
import { submitApplication } from './case-management.js'
import Wreck from '@hapi/wreck'
import { config } from '~/src/config/config.js'
import { spyOnConfig } from '../../test-helpers/config.js'

const mockRequest = /** @type { any } */ ({})
let application

describe('CaseManagement.submitApplication', () => {
  beforeAll(async () => {
    application = await TbApplicationModel.fromRequest(
      mockRequest,
      validApplicationState
    )
  })

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

  it('should not send an application if prototype mode is enabled, and send back a stubbed response', async () => {
    spyOnConfig('featureFlags', {
      prototypeMode: true
    })

    const expectedResponse = {
      message: 'EX-12AB-34CD'
    }

    const response = await submitApplication(application)

    expect(Wreck.post).not.toHaveBeenCalled()

    expect(response).toStrictEqual({
      payload: expectedResponse,
      statusCode: 200
    })
  })
})
