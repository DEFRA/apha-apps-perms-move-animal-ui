import { SectionModelV2 } from '~/src/server/common/model/section/section-model/section-model-v2.js'
import { spyOnConfig } from '../../common/test-helpers/config.js'

describe('OriginSection as SectionModelV2', () => {
  let OriginSection, origin

  beforeAll(async () => {
    spyOnConfig('featureFlags', { defraFormsEnabled: true })
    ;({ OriginSection } = await import('./section.js'))
    ;({ origin } = await import('./index.js'))
  })

  afterAll(() => {
    jest.resetModules()
  })

  it('should extend SectionModelV2', () => {
    expect(Object.getPrototypeOf(OriginSection)).toBe(SectionModelV2)
  })

  it('should have correct config', () => {
    expect(OriginSection.config.key).toBe('origin')
    expect(OriginSection.config.title).toBe('Movement origin')
    expect(OriginSection.config.plugin).toBe(origin)
    expect(OriginSection.config.summaryLink).toBe('/tb-origin/summary')
    expect(OriginSection.config.isEnabled({})).toBe(true)
    expect(OriginSection.config.isVisible({})).toBe(true)
    expect(OriginSection.journeySlug).toBe('tb-origin')
  })
})
