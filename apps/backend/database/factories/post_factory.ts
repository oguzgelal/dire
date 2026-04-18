import factory from '@adonisjs/lucid/factories'
import Post from '#models/post'

export const PostFactory = factory
  .define(Post, async ({ faker }) => {
    const upvotes = faker.number.int({ min: 0, max: 1000 })
    const downvotes = faker.number.int({ min: 0, max: 1000 })
    const votes = upvotes - downvotes

    return {
      id: faker.string.uuid(),
      title: faker.lorem.sentence(),
      url: faker.internet.url(),
      body: faker.lorem.paragraphs(3),
      upvotes,
      downvotes,
      votes,
    }
  })
  .build()
