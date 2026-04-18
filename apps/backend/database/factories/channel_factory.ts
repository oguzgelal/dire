import factory from '@adonisjs/lucid/factories'
import Channel from '#models/channel'

export const ChannelFactory = factory
  .define(Channel, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
      name: faker.lorem.word(),
    }
  })
  .build()
