import { QuestionPageController } from '@defra/forms-engine-plugin/controllers/QuestionPageController.js'

import { fetchDisinfectants } from '~/src/server/common/apis/disinfectant/index.js'

const DISINFECTANT_COMPONENT_NAME = 'FywYlV'
const DILUTION_CONFIRMATION_COMPONENT_NAME = 'kZXhGS'
const DISINFECTANT_LIST_ID = 'e9309987-1d85-4d3e-a0f9-14031ab52b99'

/**
 * Custom controller to handle disinfectant selection.
 * Ensures the dilution confirmation is reset when the disinfectant changes
 * and populates the autocomplete options from the disinfectant API response.
 */
export class DisinfectantPageController extends QuestionPageController {
  updateDisinfectantList(disinfectants) {
    if (!Array.isArray(disinfectants) || !disinfectants.length) {
      return
    }

    const list =
      this.model.getListById(DISINFECTANT_LIST_ID) ??
      this.model.getList(DISINFECTANT_LIST_ID)

    if (!list) {
      return
    }

    list.items = disinfectants.map((item) => ({
      id: item.id ?? item.name,
      text: item.text ?? item.name,
      value: item.value ?? item.name
    }))

    // Update the component cache so that the dropdown reflects the latest items
    const field = this.collection?.fields.find(
      (component) => component.name === DISINFECTANT_COMPONENT_NAME
    )

    if (field) {
      field.list = list
    }
  }

  makeGetRouteHandler() {
    const handler = super.makeGetRouteHandler()

    return async (request, context, h) => {
      if (Array.isArray(context.data.disinfectants)) {
        this.updateDisinfectantList(context.data.disinfectants)
      } else {
        try {
          const disinfectants = await fetchDisinfectants('tbo')
          const formatted = disinfectants.map((item) => ({
            id: item.name,
            name: item.name,
            text: item.name,
            value: item.name,
            dilutionRate: item.dilutionRate,
            isLiquid: item.isLiquid,
            isUndiluted: item.isUndiluted
          }))
          this.updateDisinfectantList(formatted)
          context.data.disinfectants = formatted
        } catch (error) {
          request.logger?.error(
            error,
            '[biosecurity] failed to hydrate disinfectant list'
          )
        }
      }

      return handler(request, context, h)
    }
  }

  async mergeState(request, state, update) {
    const next = update ?? {}
    const previousValue = state[DISINFECTANT_COMPONENT_NAME]
    const incomingValue = next[DISINFECTANT_COMPONENT_NAME]

    if (
      typeof incomingValue !== 'undefined' &&
      incomingValue !== previousValue
    ) {
      next[DILUTION_CONFIRMATION_COMPONENT_NAME] = undefined
    }

    return super.mergeState(request, state, next)
  }
}
