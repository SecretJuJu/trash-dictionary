import { Table, Column, Model, IsUUID, PrimaryKey, Default, DataType, AllowNull, BelongsTo, ForeignKey } from 'sequelize-typescript'
import Admin from './admin.model'

@Table({
    tableName: "feeds",
    freezeTableName: true,
    timestamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})
export default class Feed extends Model {
    @IsUUID(4)
    @PrimaryKey
    @Default(DataType.UUIDV4)
    @Column
    _id: string

    @AllowNull(false)
    @Column
    title: string
    
    @AllowNull(false)
    @Column
    content: string

    @AllowNull(false)
    @ForeignKey(() => Admin)
    @Column
    writterId: string
    
    @BelongsTo(() => Admin)
    writter: Admin

    @Default(false)
    @Column
    is_deleted: boolean
}