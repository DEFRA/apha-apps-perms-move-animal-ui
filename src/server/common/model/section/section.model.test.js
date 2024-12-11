import { NotImplementedError } from '../../helpers/not-implemented-error.js'
import { SectionModel } from './section-model.js'

describe('SectionModel', () => {
  it('should throw NotImplementedError when fromState is called', () => {
    expect(() => SectionModel.fromState({})).toThrow(NotImplementedError)
  })

  it('should prevent property additions or deletions after sealing', () => {
    const section = /** @type {any} */ (new SectionModel({ key: 'value' }))
    section.seal()

    expect(() => {
      section.something = 'should fail'
    }).toThrow()

    expect(() => {
      delete section._data
    }).toThrow()
  })
})
