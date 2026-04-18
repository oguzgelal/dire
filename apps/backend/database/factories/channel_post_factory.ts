import factory from '@adonisjs/lucid/factories'
import ChannelPost from '#models/channel_post'

export const ChannelPostFactory = factory
  .define(ChannelPost, async ({ faker }) => {
    return {
      id: faker.string.uuid(),
    }
  })
  .build()
