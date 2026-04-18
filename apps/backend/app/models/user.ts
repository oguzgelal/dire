import { UserSchema } from '#database/schema'
import hash from '@adonisjs/core/services/hash'
import { compose } from '@adonisjs/core/helpers'
import { withAuthFinder } from '@adonisjs/auth/mixins/lucid'
import { type AccessToken, DbAccessTokensProvider } from '@adonisjs/auth/access_tokens'
import { DateTime } from 'luxon'
import { column, hasMany } from '@adonisjs/lucid/orm'
import Post from './post.ts'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import UserChannelPin from './user_channel_pin.ts'

export default class User extends compose(UserSchema, withAuthFinder(hash)) {
  static selfAssignPrimaryKey = true

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Post, { localKey: 'id', foreignKey: 'user_id' })
  declare posts: HasMany<typeof Post>

  @hasMany(() => UserChannelPin, { localKey: 'id', foreignKey: 'user_id' })
  declare channelPins: HasMany<typeof UserChannelPin>

  static accessTokens = DbAccessTokensProvider.forModel(User)
  declare currentAccessToken?: AccessToken
}
