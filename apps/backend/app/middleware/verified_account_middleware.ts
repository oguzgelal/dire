import type { HttpContext } from '@adonisjs/core/http'
import type { NextFn } from '@adonisjs/core/types/http'

/**
 * Protects endpoints from user accounts that are not yet verified.
 */
export default class VerifiedAccountMiddleware {
  async handle({ auth, response }: HttpContext, next: NextFn) {
    if (auth.user && auth.user.hasInactiveAccount) {
      return response.forbidden({
        errors: [{ message: 'unverified_email' }],
      })
    }

    return next()
  }
}
