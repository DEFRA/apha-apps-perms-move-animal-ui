/* eslint-disable lines-between-class-members */
import { SingleTextInputPage } from '../base-pages/singleTextInputPage.js'

const pageId = 'equipmentMeasures'

class OtherEquipmentMeasuresPage extends SingleTextInputPage {
  constructor() {
    super({ pageId })
  }

  pagePath = 'biosecurity/other-equipment-measures'
}

export default new OtherEquipmentMeasuresPage()
