import { Inject, OnModuleInit } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ConnectedSocket, MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io'
import { Message } from "../typeorm/entities/Message";
import { Repository } from "typeorm";
import { AuthService } from "../auth/auth.service";

@WebSocketGateway({
    cors: {
        origin: '*'
    }
})
export class MyGateway implements OnModuleInit {
    constructor(
        @InjectRepository(Message) private readonly messageRepo: Repository<Message>,
        @Inject(AuthService) private readonly authService: AuthService,
    ) {}
    @WebSocketServer()
    server: Server;
    private socketIds: Map<string, Socket> = new Map();
    onModuleInit() {
        this.server.on('connection', socket => {
            // console.log(socket.id)
            this.socketIds.set(socket.id, socket);
            // this.ids.push(socket.id);
            // console.log('Connected');
        });
    }

    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket) {
        console.log({body})
        console.log(socket.id)
        const fromUser = await this.authService.findUserById(+body.from)
        const toUser = await this.authService.findUserById(+body.to)
        console.log({fromUser, toUser})
        const msg = this.messageRepo.create({
            from: fromUser,
            text: body.msg,
            to: toUser
        })
        // const content = {
        //     msg: {
        //         from: fromUser,
        //         text: body.msg,
        //         to: toUser
        //     }
        // }
        this.messageRepo.save(msg);
        this.server.emit('onMessage', {
            msg: 'New Message',
            content: msg
            // content: body,
            // from: socket.id
        })
    }
}