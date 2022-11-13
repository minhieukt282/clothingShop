import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'products'})
export class Product {
    @PrimaryGeneratedColumn({type: 'int'})
    public readonly product_id: number
    @Column({type: 'varchar'})
    public product_name: string
    @Column({type: 'varchar'})
    public description: string
    @Column({type: 'int'})
    public quantity: number
    @Column({type: 'int'})
    public price: number
    @Column({type: 'text'})
    public image: string
    @Column({type: 'int'})
    public category_id: number
    @Column({type: 'int'})
    public gender_id: number
    @Column({type: 'date'})
    public time: Date
}