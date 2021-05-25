import { Table, Column, Model, HasMany, IsUUID, PrimaryKey, Default, DataType, Unique, AllowNull, IsEmail } from 'sequelize-typescript'
// import Post from 'post.model'

@Table
export default class Admin extends Model {
  @IsUUID(4)
  @PrimaryKey
  @Default(DataType.UUIDV4)
  @Column
  _id: string

  @Unique
  @AllowNull(false)
  @Column
  username: string

  
  @AllowNull(false)
  @Column
  password : string

  
  @Unique
  @AllowNull(false)
  @IsEmail
  @Column
  email : string


//   @HasMany(() => Post)
//   posts: Post[]
}