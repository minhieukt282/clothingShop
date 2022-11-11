import {Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity({name: 'gender'})
export class Gender{
    @PrimaryGeneratedColumn({type: 'int'})
    public readonly gender_id: number
    @Column({type: 'varchar'})
    public gender_name: string
}