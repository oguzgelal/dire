import { PostSchema } from '#database/schema'
import { belongsTo, column, hasMany } from '@adonisjs/lucid/orm'
import { DateTime } from 'luxon'
import User from './user.ts'
import type { BelongsTo, HasMany } from '@adonisjs/lucid/types/relations'
import ChannelPost from './channel_post.ts'

export default class Post extends PostSchema {
  static selfAssignPrimaryKey = true

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => User, { localKey: 'user_id', foreignKey: 'id' })
  declare user: BelongsTo<typeof User>

  @hasMany(() => ChannelPost, { localKey: 'id', foreignKey: 'post_id' })
  declare channels: HasMany<typeof ChannelPost>
}
