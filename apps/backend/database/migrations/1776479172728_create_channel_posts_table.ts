import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'channel_posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('channel_id').notNullable().references('channels.id').onDelete('CASCADE') // prettier-ignore
      table.uuid('post_id').notNullable().references('posts.id').onDelete('CASCADE') // prettier-ignore

      table.boolean('is_pinned').defaultTo(false)
      table.boolean('is_deleted').defaultTo(false)

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())

      table.unique(['channel_id', 'post_id'])
      table.index(['channel_id'])
      table.index(['post_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
