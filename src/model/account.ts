import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'account'})
export class Account {
    @PrimaryGeneratedColumn({type: 'int'})
    public readonly account_id: number
    @Column({type: 'varchar'})
    public username: string
    @Column({type: 'text'})
    public password: string
}