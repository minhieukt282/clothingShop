import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'category'})
export class Category {
    @PrimaryGeneratedColumn({type: 'int'})
    public readonly category_id: number
    @Column({type: 'varchar'})
    public category_name: string
    @Column({type: 'text'})
    public image: string
}