import { OriginSection } from './section.js'
import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
import { SectionModelV2 } from '~/src/server/common/model/section/section-model/section-model-v2.js'
import { origin } from '~/src/server/tb/origin/index.js'
import { config } from '~/src/config/config.js'

// Haven't managed to mock config.get in a way that works across imports,
// so these tests rely on the real config values.

describe('OriginSection', () => {
  it('should extend SectionModelV2', () => {
    const { defraFormsEnabled } = config.get('featureFlags')
    const expectedBaseClass = defraFormsEnabled
      ? SectionModelV2
      : SectionModelV1
    expect(Object.getPrototypeOf(OriginSection)).toBe(expectedBaseClass)
  })

  it('should have correct config', () => {
    expect(OriginSection.config.key).toBe('origin')
    expect(OriginSection.config.title).toBe('Movement origin')
    expect(OriginSection.config.plugin).toBe(origin)
    const { defraFormsEnabled } = config.get('featureFlags')
    const expectedSummaryLink = defraFormsEnabled
      ? '/tb-origin/summary'
      : '/origin/check-answers'
    expect(OriginSection.config.summaryLink).toBe(expectedSummaryLink)
    expect(OriginSection.config.isEnabled({})).toBe(true)
    expect(OriginSection.config.isVisible({})).toBe(true)
  })

  it('should have journeySlug', () => {
    expect(OriginSection.journeySlug).toBe('tb-origin')
  })
})
