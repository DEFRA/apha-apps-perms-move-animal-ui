import { SectionModel } from './section-model.js'

describe('SectionModel', () => {
  const notImplementedError = 'Not implemented'
  let section

  beforeEach(() => {
    section = new SectionModel()
  })

  it('should throw NotImplementedError when fromState is called', () => {
    expect(() => SectionModel.fromState({})).toThrow(notImplementedError)
  })

  it('should seal the object to prevent property additions or deletions', () => {
    section = new SectionModel({ key: 'value' })

    expect(() => {
      section.something = 'should fail'
    }).toThrow()

    expect(() => {
      delete section._data
    }).toThrow()
  })
})
