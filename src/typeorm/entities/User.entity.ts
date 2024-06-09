import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./Property";

@Entity({name: 'users'})
export class User {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    email: string

    @Column({nullable: true})
    password: string

    @Column({nullable: true})
    displayName: string

    @Column({nullable: true})
    profile_pic: string

    @Column({default: false})
    verified: boolean

    @OneToMany(type => Property, property => property.user)
    properties: Property[]
}