import { Inject, Injectable } from '@nestjs/common';
import { Message } from '../typeorm/entities/Message';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from '../auth/auth.service';

@Injectable()
export class MessageService {
    constructor(
        @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
        @Inject(AuthService) private readonly authService: AuthService,
    ) {}
    async getMessages(userId: number, contactId: number) {
        if(userId === null || userId === undefined || contactId === null || contactId === undefined) return;
        // console.log({userId, contactId})
        const user = await this.authService.findUserById(userId)
        const contact = await this.authService.findUserById(contactId)
        return this.messageRepo.find({
            where: [
                {to: user, from: contact},
                {to: contact, from: user},
            ],
            order: {
                createdAt: 'ASC'
            },
            relations: ['to', 'from']
        })
    }
}
