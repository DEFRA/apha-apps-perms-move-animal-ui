import { application, summary } from './model.js'

describe('summary', () => {
  it('should produce just the data needed to render a summary', () => {
    expect(summary(application)).toEqual([
      {
        question: 'Are you moving the cattle on or off your farm or premises?',
        questionType: 'radio',
        answer: {
          radio: 'On to the farm or premises'
        }
      },
      {
        question:
          'What is the County Parish Holding (CPH) number of your farm or premises where the animals are moving off?',
        questionType: 'cphNumber',
        answer: { cphNumber: '12/345/6789' }
      },
      {
        question:
          'What is the address of your farm or premises where the animals are moving off?',
        questionType: 'address',
        answer: {
          addressLine1: 'Starfleet Headquarters',
          addressTown: 'San Francisco',
          addressPostcode: 'RG24 8RR'
        }
      }
    ])
  })
})
