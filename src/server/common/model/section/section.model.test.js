import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { SectionModel } from './section-model.js'

describe('SectionModel', () => {
  it('should throw NotImplementedError when fromState is called', () => {
    expect(() => SectionModel.fromState({})).toThrow(NotImplementedError)
  })

  it('should seal the object to prevent property additions or deletions', () => {
    const section = /** @type {any} */ (new SectionModel({ key: 'value' }))

    expect(() => {
      section.something = 'should fail'
    }).toThrow()

    expect(() => {
      delete section._data
    }).toThrow()
  })
})
