import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'bill'})
export class Bill {
    @PrimaryGeneratedColumn({type: 'int'})
    public readonly bill_id: number
    @Column({type: 'int'})
    public account_id: number
    @Column({type: 'date'})
    public time: Date
    @Column()
    public status: boolean
}