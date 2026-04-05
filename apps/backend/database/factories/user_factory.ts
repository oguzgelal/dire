import factory from '@adonisjs/lucid/factories'
import User from '#models/user'

export const UserFactory = factory
  .define(User, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
      username: faker.internet.username(),
    }
  })
  .build()
