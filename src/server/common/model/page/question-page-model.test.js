import { OnOffFarm } from '../answer/on-off-farm.js'
import { QuestionPage } from './question-page-model.js'
import { NotImplementedError } from '../../helpers/not-implemented-error.js'

describe('QuestionPage', () => {
  const question = new QuestionPage()

  it('should should have the question to ask the user', () => {
    expect(question).toHaveProperty('question')
  })

  it('should should have questionKey - where we store the answer', () => {
    expect(question).toHaveProperty('questionKey')
  })

  it('should have an expected answer model', () => {
    expect(question).toHaveProperty('Answer')
  })

  it('should have an expected view', () => {
    expect(question).toHaveProperty('view')
  })

  it('should have an expected sectionKey', () => {
    expect(question).toHaveProperty('sectionKey')
  })

  it('should title & heading should be the same as the question', () => {
    const question =
      'Are you moving the cattle on or off your farm or premises?'

    class OnOffFarm extends QuestionPage {
      question = question
    }

    const onOffFarm = new OnOffFarm()

    expect(onOffFarm.heading).toBe(question)
    expect(onOffFarm.title).toBe(question)
  })

  it('should throw NotImplementedError for the nextPage', () => {
    const answer = new OnOffFarm({ onOffFarm: 'off' })
    expect(() => question.nextPage(answer)).toThrow(NotImplementedError)
  })
})
