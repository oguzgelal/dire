import User from '#models/user'
import db from '@adonisjs/lucid/services/db'
import { signupValidator } from '#validators/user'
import type { HttpContext } from '@adonisjs/core/http'
import UserTransformer from '#transformers/user_transformer'

export default class NewAccountController {
  async store({ request, serialize }: HttpContext) {
    const { username, email, password } = await request.validateUsing(signupValidator)

    const { user, token } = await db.transaction(async (tx) => {
      const newUser = await User.create(
        { username, email, unverifiedEmail: email, password },
        { client: tx }
      )
      const verificationToken = await newUser.createEmailVerificationToken()
      return {
        user: newUser,
        token: verificationToken,
      }
    })

    return serialize({
      user: UserTransformer.transform(user),
      token: token.value!.release(),
    })
  }
}
