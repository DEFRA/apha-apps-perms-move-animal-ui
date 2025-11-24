import { services, defraFormsPlugin, pluginOptions } from './index.js'

jest.mock('~/src/config/nunjucks/context/context.js', () => ({
  context: {}
}))

jest.mock('@defra/forms-engine-plugin', () => ({
  default: {}
}))

const originDetails = {
  name: 'Apps & Permissions - TB / Origin',
  id: '48158770-647d-4fde-a3c5-1fc1e28f780e',
  slug: 'tb-origin'
}

describe('defra-forms plugin', () => {
  describe('formsService', () => {
    describe('getFormMetadata', () => {
      it('should return tb-origin journey metadata when slug matches', () => {
        const result = services.formsService.getFormMetadata(originDetails.slug)
        expect(result.id).toEqual(originDetails.id)
      })

      it('should throw Boom.notFound when slug does not match', () => {
        expect(() =>
          services.formsService.getFormMetadata('unknown-slug')
        ).toThrow("Form 'unknown-slug' not found")
      })
    })

    describe('getFormDefinition', () => {
      it('should return tb-origin journey definition when id matches', async () => {
        const result = await services.formsService.getFormDefinition(
          originDetails.id
        )

        expect(result.name).toBe(originDetails.name)
      })

      it('should throw error when id does not match', async () => {
        await expect(
          services.formsService.getFormDefinition('unknown-id')
        ).rejects.toThrow("Form 'unknown-id' not found")
      })
    })
  })

  describe('formSubmissionService', () => {
    it('should have persistFiles method', () => {
      expect(services.formSubmissionService.persistFiles).toBeDefined()
    })

    it('should have submit method', () => {
      expect(services.formSubmissionService.submit).toBeDefined()
    })
  })

  describe('outputService', () => {
    it('should have submit method', () => {
      expect(services.outputService.submit).toBeDefined()
    })
  })

  describe('defraFormsPlugin', () => {
    it('should export plugin configuration', () => {
      expect(defraFormsPlugin.plugin).toBeDefined()
      expect(defraFormsPlugin.options).toBe(pluginOptions)
    })
  })
})
