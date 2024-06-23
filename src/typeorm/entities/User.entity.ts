import { Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Property } from "./Property";
import { Message } from "./Message";

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

    @OneToMany(() => Message, message => message.from)
    sentMessages: Message[];

    @OneToMany(() => Message, message => message.to)
    receivedMessages: Message[];
    
    @OneToMany(() => Property, property => property.user)
    properties: Property[]
}