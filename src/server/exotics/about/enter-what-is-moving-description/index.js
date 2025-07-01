import { Page } from '~/src/server/common/model/page/page-model.js'

export class EnterWhatIsMovingDescriptionPage extends Page {
  urlPath =
    '/about-the-movement/what-is-moving/enter-what-is-moving/description'
}

export const enterWhatIsMovingDescriptionPage =
  new EnterWhatIsMovingDescriptionPage()
