import { ChannelSchema } from '#database/schema'
import { column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import ChannelPost from './channel_post.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'

export default class Channel extends ChannelSchema {
  static selfAssignPrimaryKey = true

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => ChannelPost, { localKey: 'id', foreignKey: 'channel_id' })
  declare posts: HasMany<typeof ChannelPost>
}
