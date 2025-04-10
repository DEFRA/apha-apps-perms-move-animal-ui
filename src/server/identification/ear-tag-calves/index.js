import { Page } from '../../common/model/page/page-model.js'

export class EarTagsCalvesPage extends Page {
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/enter-ear-tags-calves`
}

export const earTagsCalvesPage = new EarTagsCalvesPage()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
