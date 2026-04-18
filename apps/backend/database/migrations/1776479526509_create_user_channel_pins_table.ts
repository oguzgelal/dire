import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'user_channel_pins'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.uuid('id').notNullable().primary()
      table.uuid('user_id').notNullable().references('users.id').onDelete('CASCADE') // prettier-ignore
      table.uuid('channel_id').notNullable().references('channels.id').onDelete('CASCADE') // prettier-ignore

      table.uuid('prev_id').nullable().references('user_channel_pins.id').onDelete('SET NULL') // prettier-ignore
      table.uuid('next_id').nullable().references('user_channel_pins.id').onDelete('SET NULL') // prettier-ignore

      table.timestamp('created_at').notNullable().defaultTo(this.now())
      table.timestamp('updated_at').nullable().defaultTo(this.now())

      table.unique(['user_id', 'channel_id'])
      table.index(['channel_id'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
