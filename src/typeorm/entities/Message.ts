import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User.entity";

@Entity({name: 'messages'})
export class Message {
    @PrimaryGeneratedColumn()
    id: number

    @Column({default: ''})
    text: string

    @ManyToOne(() => User, user => user.sentMessages)
    from: User;

    @ManyToOne(() => User, user => user.receivedMessages)
    to: User;
}