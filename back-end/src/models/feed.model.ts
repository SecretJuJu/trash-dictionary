import { Table, Column, Model, HasMany, IsUUID, PrimaryKey, Default, DataType, Unique, AllowNull, IsEmail } from 'sequelize-typescript'
// import Post from 'post.model'

@Table
export default class Admin extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column
    _id: string

    @Column
    title: string

    @Column
    keyWord: string
}