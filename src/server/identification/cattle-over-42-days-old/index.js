import { Page } from '../../common/model/page/page-model.js'

export class CattleOver42DaysPage extends Page {
  sectionKey = 'identification'
  urlPath = `/${this.sectionKey}/any-cattle-over-42-days`
}

export const cattleOver42DaysPage = new CattleOver42DaysPage()

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
