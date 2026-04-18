import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_votes'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE') // prettier-ignore
      table.uuid('post_id').notNullable().references('posts.id').onDelete('CASCADE') // prettier-ignore

      table.integer('vote').notNullable() // 1 for upvote, -1 for downvote

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())

      table.unique(['user_id', 'post_id'])
      table.index(['user_id'])
      table.index(['post_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
