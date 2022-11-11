import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'details'})
export class Details {
    @PrimaryGeneratedColumn({type: 'int'})
    public readonly details_id: number
    @Column({type: 'int'})
    public bill_id: number
    @Column({type: 'int'})
    public product_id: number
    @Column({type: 'int'})
    public quantity: number
}