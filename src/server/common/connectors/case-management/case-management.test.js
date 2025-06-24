import { statusCodes } from '../../constants/status-codes.js'
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
      payload: {
        journeyVersion: {
          major: 1,
          minor: 0
        },
        journeyId:
          'GET_PERMISSION_TO_MOVE_ANIMALS_UNDER_DISEASE_CONTROLS_TB_ENGLAND',
        ...application.caseManagementData
      },
      timeout
    })

    expect(response).toStrictEqual({
      payload: expectedResponse,
      statusCode: 200
    })
  })
})
