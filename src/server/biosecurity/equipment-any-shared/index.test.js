import { EquipmentAnySharedPage } from './index.js'
const pageUrl = '/biosecurity/equipment-any-shared'

describe('EquipmentAnySharedPage', () => {
  const page = new EquipmentAnySharedPage()

  it('should have the correct urlPath', () => {
    expect(page.urlPath).toBe(pageUrl)
  })
})
