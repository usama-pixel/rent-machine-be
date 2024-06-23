import { Controller, Get, Req, UseGuards, UseInterceptors } from '@nestjs/common';
import { MessageService } from './message.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { Request } from 'express';
import { MessagesInterceptor } from './interceptors/messages.interceptor';

@Controller('message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(MessagesInterceptor)
  getMessages(@Req() req: Request) {
    // console.log('Inside getMessages')
    const {userId, contactId} = req.query
    return this.messageService.getMessages(+userId, +contactId);
  }
}
