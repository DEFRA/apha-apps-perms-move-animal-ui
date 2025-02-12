import { keptSeparatelyPage } from '~/src/server/biosecurity/kept-separately/index.js'
import { SectionModel } from '../section-model/section-model.js'
import { config } from '~/src/config/config.js'
import { biosecurity } from '~/src/server/biosecurity/index.js'

/** @import {RawApplicationState} from '../../state/state-manager.js' */

/**
 * export @typedef {{
 * keptSeparately: KeptSeparatelyData | undefined;
 * grazing: GrazingData | undefined;
 * lastGrazed: string | undefined;
 * manureAndSlurry: ManureAndSlurryData | undefined;
 * grazingFieldHowSeparated: string | undefined;
 * roadsAndTracks: RoadsAndTracksData | undefined;
 * buildingsAnyShared: BuildingsAnySharedData | undefined;
 * }} BiosecurityData
 * @import {KeptSeparatelyData} from '../../answer/kept-separately/kept-separately.js'
 * @import {GrazingData} from '../../answer/grazing/grazing.js'
 * @import {ManureAndSlurryData} from '../../answer/manure-and-slurry/manure-and-slurry.js'
 * @import {RoadsAndTracksData} from '../../answer/roads-and-tracks/roads-and-tracks.js'
 * @import {BuildingsAnySharedData} from '../../answer/buildings-any-shared/buildings-any-shared.js'
 */
export class BiosecuritySection extends SectionModel {
  static config = {
    key: 'biosecurity',
    title: 'Biosecurity details',
    plugin: biosecurity,
    summaryLink: '/biosecurity/check-answers',
    isEnabled: () => true,
    isVisible: config.get('featureFlags')?.biosecurity
  }

  static firstPageFactory = () => keptSeparatelyPage
}
