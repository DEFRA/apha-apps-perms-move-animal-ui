import { calculateNextPage } from '../../helpers/next-page.js'
import { ExitPage } from '../../model/page/exit-page-model.js'
import GenericPageController from '../generic-page-controller/index.js'
import { StateManager } from '../../model/state/state-manager.js'
import { nextPageRedirect } from '../../helpers/next-page-redirect/index.js'
import { getAuthOptions } from '../../helpers/auth/toggles-helper.js'
import { features } from '../../helpers/errors.js'

/** @import { Server, ServerRegisterPluginObject } from '@hapi/hapi' */
/** @import { NextPage } from '../../helpers/next-page.js' */
/** @import { RawPayload } from '../../model/answer/answer-model.js' */
/** @import { QuestionPage } from '../../model/page/question-page-model.js' */

export class QuestionPageController extends GenericPageController {
  /**
   * @param {QuestionPage} page
   */
  constructor(page) {
    super(page)
    this.page = page
    this.errorKey = `errors:${this.page.sectionKey}:${this.page.questionKey}`
  }

  /** @returns {ServerRegisterPluginObject<void>} */
  plugin() {
    return {
      plugin: {
        name:
          this.pluginName ??
          `${this.page.sectionKey}-${this.page.constructor.name}`,

        /** @param {Server} server */
        register: (server) => {
          const options = {
            ...getAuthOptions(this.page.skipAuth)
          }

          server.route([
            {
              method: 'GET',
              path: this.page.urlPath,
              handler: this.getHandler.bind(this),
              options
            },
            {
              method: 'POST',
              path: this.page.urlPath,
              handler: this.postHandler.bind(this),
              options
            }
          ])
        }
      }
    }
  }

  handleGet(req, h, args = {}) {
    const applicationState = new StateManager(req).toState()
    const sectionState = applicationState[this.page.sectionKey]
    const answer = this.page.Answer.fromState(
      sectionState?.[this.page.questionKey],
      applicationState
    )

    const pageError = req.yar.get(this.errorKey)

    if (pageError) {
      return h
        .view(this.page.view, {
          nextPage: req.query.redirect_uri,
          heading: this.page.heading,
          answer: new this.page.Answer(pageError.payload, applicationState),
          pageTitle: `Error: ${this.page.title}`,
          errors: pageError.errors,
          errorMessages: pageError.errorMessages,
          viewModelOptions: {
            validate: true,
            question: this.page.question
          },
          ...args,
          ...this.page.viewProps(req)
        })
        .header(
          'Permissions-Policy',
          features.map((feature) => `${feature}=()`).join(',')
        )
    }

    return h
      .view(this.page.view, {
        nextPage: req.query.redirect_uri,
        pageTitle: this.page.title,
        heading: this.page.heading,
        value: answer.value,
        answer,
        viewModelOptions: {
          validate: false,
          question: this.page.question
        },
        ...args,
        ...this.page.viewProps(req)
      })
      .header(
        'Permissions-Policy',
        features.map((feature) => `${feature}=()`).join(',')
      )
  }

  handlePost(req, h) {
    req.yar.clear(this.errorKey)
    const payload = /** @type {NextPage} */ (req.payload)
    const state = new StateManager(req)
    const applicationState = state.toState()
    const Answer = this.page.Answer
    const answer = new Answer(
      /** @type {RawPayload} */ (payload),
      applicationState
    )
    const { isValid, errors } = answer.validate()

    if (!isValid) {
      this.recordErrors(errors)
      state.set(this.page, undefined)

      req.yar.set(this.errorKey, {
        errors,
        errorMessages: Answer.errorMessages(errors),
        payload
      })

      return h.redirect(nextPageRedirect(this.page, req.query))
    }

    state.set(this.page, answer)

    const nextPage = this.page.nextPage(answer, applicationState)

    if (nextPage instanceof ExitPage) {
      return h.redirect(nextPage.urlPath)
    } else {
      if (nextPage.overrideRedirects) {
        return h.redirect(nextPageRedirect(nextPage, req.query))
      }

      return h.redirect(calculateNextPage(payload.nextPage, nextPage.urlPath))
    }
  }
}
