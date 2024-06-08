import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

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
}