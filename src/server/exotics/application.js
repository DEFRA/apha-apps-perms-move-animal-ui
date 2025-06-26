import { ApplicationModelAbstract } from '../common/model/application/application.js'
import { ExoticAboutSection } from './about/section-model.js'

export class ExoticsApplicationModel extends ApplicationModelAbstract {
  static implementedSections = [ExoticAboutSection]
}
