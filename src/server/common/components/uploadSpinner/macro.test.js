import { renderComponent } from '~/src/server/common/test-helpers/component-helpers.js'

describe('Upload Spinner Component', () => {
  /** @type {CheerioAPI} */
  let $spinner

  describe('not from form page', () => {
    const spinnerConfig = {
      title: 'Uploading the biosecurity map',
      subTitle: 'This may take a few minutes.',
      formPage: false
    }

    beforeEach(() => {
      $spinner = renderComponent('uploadSpinner', spinnerConfig)
    })

    test('Should render app upload spinner', () => {
      expect($spinner('[data-testid="upload-spinner"]')).toHaveLength(1)
      expect($spinner('.govuk-heading-l').text()).toBe(spinnerConfig.title)
      expect($spinner('p').text()).toBe(spinnerConfig.subTitle)
      expect(
        $spinner('[data-testid="upload-spinner"]').attr('class')
      ).toContain('apha-block')
    })
  })

  describe('from form page', () => {
    const spinnerConfig = {
      title: 'Uploading the biosecurity map',
      subTitle: 'This may take a few minutes.',
      formPage: true
    }

    beforeEach(() => {
      $spinner = renderComponent('uploadSpinner', spinnerConfig)
    })

    test('Should render app upload spinner', () => {
      expect($spinner('[data-testid="upload-spinner"]')).toHaveLength(1)
      expect($spinner('.govuk-heading-l').text()).toBe(spinnerConfig.title)
      expect($spinner('p').text()).toBe(spinnerConfig.subTitle)
      expect(
        $spinner('[data-testid="upload-spinner"]').attr('class')
      ).toContain('apha-hidden')
    })
  })
})

/**
 * @import { CheerioAPI } from 'cheerio'
 */
