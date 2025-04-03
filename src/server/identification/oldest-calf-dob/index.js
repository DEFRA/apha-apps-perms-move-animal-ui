import { Page } from '../../common/model/page/page-model.js'

export class OldestCalfDobPage extends Page {
  urlPath = '/identification/oldest-calf-dob'
  sectionKey = 'identification'
}

export const oldestCalfDobPage = new OldestCalfDobPage()
