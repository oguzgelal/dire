import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'posts'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('user_id').nullable().references('users.id').onDelete('SET NULL') // prettier-ignore

      table.string('title')
      table.string('url').nullable()
      table.string('body').nullable()

      table.integer('votes').defaultTo(0)
      table.integer('upvotes').defaultTo(0)
      table.integer('downvotes').defaultTo(0)

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())

      table.index(['user_id'])
      table.index(['created_at'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
