import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({name: 'properties'})
export class Property {
    @PrimaryGeneratedColumn()
    id: number

    @Column({nullable: true})
    property_name: string

    @Column({default: 0, type: 'int'})
    price: number

    @Column({default: 0, type: 'int'})
    rent: number

    @Column({nullable: true})
    property_type: string

    @Column({nullable: true, type: 'int'})
    rooms: number

    @Column({type: 'int', default: 0})
    bathrooms: number

    @Column({type: 'int', default: 0})
    sqft: number

    @Column({nullable: true})
    description: string
    
    @Column({nullable: true})
    address: string

    @Column({nullable: true})
    image: string

    @Column({default: false})
    verified: boolean

    @ManyToOne(type => User, user => user.properties)
    user: User
    
}