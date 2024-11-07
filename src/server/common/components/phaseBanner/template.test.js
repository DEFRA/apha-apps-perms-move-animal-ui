import { renderComponent } from '~/src/server/common/test-helpers/component-helpers.js'

describe('Phase Banner Component', () => {
  /** @type {CheerioAPI} */
  let $phaseBanner

  beforeEach(() => {
    $phaseBanner = renderComponent('phaseBanner', {
      phase: 'Private beta'
    })
  })

  test('Should render app phase banner component', () => {
    expect($phaseBanner('[data-testid="app-phase-banner"]')).toHaveLength(1)
  })

  test('Should contain expected heading', () => {
    expect($phaseBanner('[data-testid="app-phase"]').text().trim()).toBe(
      'Private beta'
    )
  })
})

/**
 * @import { CheerioAPI } from 'cheerio'
 */
