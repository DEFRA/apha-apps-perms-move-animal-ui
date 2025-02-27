import { biosecuritySummary } from './check-answers/index.js'
import { keptSeparately } from './kept-separately/index.js'
import { grazing } from './grazing/index.js'
import { lastGrazed } from './last-grazed/index.js'
import { manureAndSlurry } from './manure-and-slurry/index.js'
import { grazingFieldHowSeparated } from './grazing-field-how-separated/index.js'
import { buildingsAnyShared } from './buildings-any-shared/index.js'
import { buildingsHowMinimiseContamination } from './buildings-how-minimise-contamination/index.js'
import { peopleDisinfection } from './people-disinfection/index.js'
import { disinfectant } from './disinfectant/index.js'
import { disinfectantDilution } from './disinfectant-dilution/index.js'
import { badgers } from './badgers/index.js'

/**
 * @satisfies {ServerRegisterPluginObject<void>}
 */
export const biosecurity = {
  plugin: {
    name: 'biosecurity',
    async register(server) {
      await server.register([
        keptSeparately,
        grazing,
        lastGrazed,
        manureAndSlurry,
        grazingFieldHowSeparated,
        buildingsAnyShared,
        buildingsHowMinimiseContamination,
        peopleDisinfection,
        disinfectant,
        disinfectantDilution,
        badgers,
        biosecuritySummary
      ])
    }
  }
}

/**
 * @import { ServerRegisterPluginObject } from '@hapi/hapi'
 */
