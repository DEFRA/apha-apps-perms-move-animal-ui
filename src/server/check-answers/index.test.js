import { createServer } from '~/src/server/index.js'
import { statusCodes } from '~/src/server/common/constants/status-codes.js'
import { withCsrfProtection } from '~/src/server/common/test-helpers/csrf.js'
import { parseDocument } from '~/src/server/common/test-helpers/dom.js'
import SessionTestHelper from '../common/test-helpers/session-helper.js'
import { sendNotification } from '../common/connectors/notify/notify.js'

jest.mock('../common/connectors/notify/notify.js', () => ({
  sendNotification: jest.fn()
}))
const mockSendNotification = /** @type {jest.Mock} */ (sendNotification)

const testCphNumber = '12/123/1234'
const testAddress = {
  addressLine1: 'Starfleet Headquarters',
  addressLine2: '24-593 Federation Drive',
  addressTown: 'San Francisco',
  addressCounty: 'San Francisco',
  addressPostcode: 'RG24 8RR'
}
const testEmailAddress = 'name@example.com'
const testReceiveMethodValue = 'email'
const testReceiveMethodLabel = 'Email'
const yesValue = 'yes'
const yesLabel = 'Yes'
const testLastGrazedValue = 'Yesterday'
const testGrazingFieldHowSeparated = 'some details'
const testBuildingsHowMinimiseContamination = 'somehow'
const testPeopleDisinfection = 'ppe'
const testDisinfectant = 'some disinfectant'
const testDilutionRate = '15'

const originDefaultState = {
  onOffFarm: 'off',
  cphNumber: testCphNumber,
  originType: 'afu',
  address: testAddress
}

const destinationDefaultState = {
  destinationType: 'dedicated-sale'
}
const expectedDestinationText = 'Dedicated sale for TB (orange market)'

const licenceDefaultState = {
  emailAddress: testEmailAddress,
  receiveMethod: testReceiveMethodValue,
  fullName: {
    firstName: 'William T.',
    lastName: 'Riker'
  }
}

const identificationsDefaultState = {
  earTags: 'ear-tags'
}
const expectedAnimalIdentifiersText = 'ear-tags'

const biosecurityDefaultState = {
  keptSeparately: yesValue,
  grazing: yesValue,
  lastGrazed: testLastGrazedValue,
  manureAndSlurry: yesValue,
  grazingFieldHowSeparated: testGrazingFieldHowSeparated,
  roadsAndTracks: yesValue,
  buildingsAnyShared: yesValue,
  buildingsHowMinimiseContamination: testBuildingsHowMinimiseContamination,
  peopleDisinfection: testPeopleDisinfection,
  disinfectant: testDisinfectant,
  dilutionRate: testDilutionRate
}

const biosecurityMapDefaultState = {
  'upload-plan': {
    metadata: {
      uploadId: '41572cf8-2e37-495e-9ad2-0b0f23f1b277',
      uploadUrl:
        'http://localhost:7337/upload-and-scan/41572cf8-2e37-495e-9ad2-0b0f23f1b277',
      statusUrl:
        'http://localhost:7337/status/41572cf8-2e37-495e-9ad2-0b0f23f1b277'
    },
    status: {
      uploadStatus: 'ready',
      metadata: {},
      form: {
        crumb: 'QVJdAVFWpx90BqITFf6tFf7CpwJFNn2jGN-8CyKwlO9',
        nextPage: '',
        file: {
          fileId: '3d3c2a09-2888-4199-9bd6-ac7eda3125f0',
          filename: '34998B77-FB3E-44DB-BC0E-05154D6549E0.jpeg',
          contentType: 'image/jpeg',
          fileStatus: 'complete',
          contentLength: 374478,
          checksumSha256: '3etoXNlR16WpgCiwylqccFxLVg3OrZvpGUqmigmrhcU=',
          detectedContentType: 'image/jpeg',
          s3Key:
            'biosecurity-map/41572cf8-2e37-495e-9ad2-0b0f23f1b277/3d3c2a09-2888-4199-9bd6-ac7eda3125f0',
          s3Bucket: 'apha'
        }
      },
      numberOfRejectedFiles: 0
    }
  }
}

const pageTitle = 'Check your answers before sending your application'
const confirmationUri = '/submit/confirmation'
const checkAnswersUri = '/submit/check-answers'
const taskListIncompleteUri = '/task-list-incomplete'

const emailContent = [
  '## Are you moving the animals on or off your farm or premises?',
  'Off the farm or premises',
  '## What type of premises are the animals moving off?',
  'Approved finishing unit (AFU)',
  '## What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?',
  testCphNumber,
  '## What is the address of your farm or premises where the animals are moving off?',
  testAddress.addressLine1,
  testAddress.addressLine2,
  testAddress.addressTown,
  testAddress.addressCounty,
  testAddress.addressPostcode,
  '## Where are the animals going to?',
  expectedDestinationText,
  '## What is the name of the County Parish Holding (CPH) owner?',
  licenceDefaultState.fullName.firstName +
    ' ' +
    licenceDefaultState.fullName.lastName,
  '## How would you like this licence sent to you?',
  testReceiveMethodLabel,
  '## What email address would you like the licence sent to?',
  testEmailAddress,
  '## Enter the ear tag numbers of the animals you are planning to move',
  expectedAnimalIdentifiersText,
  '## Will you separate the incoming cattle from the resident herd?',
  yesLabel,
  '## Will the incoming cattle be grazed?',
  yesLabel,
  '## How long ago was the field last grazed by cattle?',
  testLastGrazedValue,
  '## Has any manure or slurry been put on the grazing field in the past 60 days?',
  yesLabel,
  '## How is this grazing field separated from the resident herd?',
  testGrazingFieldHowSeparated,
  '## Will the incoming cattle come into contact with any roads or tracks used by the existing cattle?',
  yesLabel,
  '## Will the cattle share any buildings and equipment with the resident herd?',
  yesLabel,
  '## How will you reduce building and equipment contamination?',
  testBuildingsHowMinimiseContamination,
  '## What measures are you taking to minimise the risk of staff working with the incoming cattle spreading contamination onto resident or other cattle?',
  testPeopleDisinfection,
  '## What disinfectant are you using?',
  testDisinfectant,
  '## What dilution rate are you using?',
  testDilutionRate,
  '## Upload a biosecurity map',
  'Map uploaded',
  '## undefined',
  'Map uploaded'
].join('\n')

describe('#CheckAnswers', () => {
  /** @type {Server} */
  let server
  let session

  beforeAll(async () => {
    server = await createServer()
    await server.initialize()
  })

  beforeEach(async () => {
    session = await SessionTestHelper.create(server)
    await session.setState('origin', originDefaultState)
    await session.setState('licence', licenceDefaultState)
    await session.setState('destination', destinationDefaultState)
    await session.setState('identification', identificationsDefaultState)
    await session.setState('biosecurity', biosecurityDefaultState)
    await session.setState('biosecurity-map', biosecurityMapDefaultState)
  })

  afterAll(async () => {
    await server.stop({ timeout: 0 })
  })

  it('Should provide expected response', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: checkAnswersUri,
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const document = parseDocument(payload)
    expect(document.querySelector('#main-content')?.innerHTML).toMatchSnapshot()
    expect(document.title).toEqual(pageTitle)
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('Should redirect to task-incomplete page if not all answers valid', async () => {
    await session.setState('origin', {})
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: checkAnswersUri,
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(taskListIncompleteUri)
  })

  it('Should stay in check-answers if all tasks are valid', async () => {
    const { statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'GET',
          url: checkAnswersUri
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should not send an email on POST and display an error if a declaration is missing', async () => {
    const { payload, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(parseDocument(payload).title).toBe(`Error: ${pageTitle}`)
    expect(payload).toEqual(
      expect.stringContaining(
        '<a href="#confirmation">You need to tick a declaration box</a>'
      )
    )

    expect(sendNotification).not.toHaveBeenCalled()
    expect(statusCode).toBe(statusCodes.ok)
  })

  it('should not send an email and redirect to task incomplete on POST if application is invalid', async () => {
    await session.setState('origin', {})
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {}
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    expect(sendNotification).not.toHaveBeenCalled()
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(taskListIncompleteUri)
  })

  it('should error if email fails ot send for whatever reason', async () => {
    mockSendNotification.mockImplementationOnce(() => {
      throw new Error('Failed to send email')
    })

    const { statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {
            confirmation: 'confirm'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toBe(emailContent)
    expect(mockSendNotification).toHaveBeenCalledTimes(1)
    expect(statusCode).toBe(statusCodes.serverError)
    expect(await session.getState('origin')).toEqual(originDefaultState)
    expect(await session.getState('destination')).toEqual(
      destinationDefaultState
    )
    expect(await session.getState('licence')).toEqual(licenceDefaultState)
  })

  it('Should redirect correctly when there is no error', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {
            confirmation: ['confirm', 'other']
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toBe(emailContent)
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
  })

  it('Should send email and redirect correctly when only `confirm` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {
            confirmation: 'confirm'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toBe(emailContent)
    expect(mockSendNotification).toHaveBeenCalledTimes(1)
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
    expect(await session.getState('origin')).toBeUndefined()
    expect(await session.getState('destination')).toBeUndefined()
    expect(await session.getState('licence')).toBeUndefined()
    expect(await session.getState('submit')).toBeUndefined()
  })

  it('Should send email and redirect correctly when only `other` present', async () => {
    const { headers, statusCode } = await server.inject(
      withCsrfProtection(
        {
          method: 'POST',
          url: checkAnswersUri,
          payload: {
            confirmation: 'other'
          }
        },
        {
          Cookie: session.sessionID
        }
      )
    )

    const [{ content }] = mockSendNotification.mock.calls[0]

    expect(content).toBe(emailContent)
    expect(statusCode).toBe(statusCodes.redirect)
    expect(headers.location).toBe(confirmationUri)
  })
})

/**
 * @import { Server } from '@hapi/hapi'
 */
