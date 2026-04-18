import { ChannelFactory } from '#database/factories/channel_factory'
import { ChannelPostFactory } from '#database/factories/channel_post_factory'
import { PostFactory } from '#database/factories/post_factory'
import { UserFactory } from '#database/factories/user_factory'
import { BaseSeeder } from '@adonisjs/lucid/seeders'

const NUM_USERS = 10
const NUM_CHANNELS = 20
const NUM_POSTS = 100

export default class extends BaseSeeder {
  async run() {
    const user = await UserFactory.merge({
      username: 'oz',
      email: 'oz@test.com',
      password: 'password',
    }).create()

    const users = await UserFactory.createMany(NUM_USERS)

    const allUsers = [user, ...users]

    const channels = await ChannelFactory.createMany(NUM_CHANNELS)

    const posts = await PostFactory.merge(
      Array.from({ length: NUM_POSTS }, () => ({
        userId: allUsers[Math.floor(Math.random() * allUsers.length)].id,
      }))
    ).createMany(NUM_POSTS)

    // create channel <-> posts
    await Promise.all(
      channels.map((channel) => {
        const channelPosts = posts
          .sort(() => 0.5 - Math.random())
          .slice(0, Math.floor(Math.random() * posts.length))

        return ChannelPostFactory.merge(
          channelPosts.map((post) => ({
            channelId: channel.id,
            postId: post.id,
          }))
        ).createMany(channelPosts.length)
      })
    )
  }
}
