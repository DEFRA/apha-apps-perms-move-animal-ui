import { SectionModelV1 } from '~/src/server/common/model/section/section-model/section-model-v1.js'
import { spyOnConfig } from '../../common/test-helpers/config.js'

describe('OriginSection as SectionModelV1', () => {
  let OriginSection, origin, onOffFarmPage

  beforeAll(async () => {
    spyOnConfig('featureFlags', { defraFormsEnabled: false })
    ;({ OriginSection } = await import('./section.js'))
    ;({ origin } = await import('./index.js'))
    ;({ onOffFarmPage } = await import('./on-off-farm/index.js'))
  })

  afterAll(() => {
    jest.resetModules()
  })

  it('should extend SectionModelV1', () => {
    expect(Object.getPrototypeOf(OriginSection)).toBe(SectionModelV1)
  })

  it('should have correct config', () => {
    expect(OriginSection.config.key).toBe('origin')
    expect(OriginSection.config.title).toBe('Movement origin')
    expect(OriginSection.config.plugin).toBe(origin)
    expect(OriginSection.config.summaryLink).toBe('/origin/check-answers')
    expect(OriginSection.config.isEnabled({})).toBe(true)
    expect(OriginSection.config.isVisible({})).toBe(true)
    expect(OriginSection.firstPageFactory()).toBe(onOffFarmPage)
  })
})
