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
            // console.log({handshake: socket.handshake.query.userId})
            const userId = socket.handshake.query.userId
            if(!userId) return;
            this.socketIds.set(userId as string, socket);
        });
    }
    count = 0;
    @SubscribeMessage('newMessage')
    async onNewMessage(@MessageBody() body: any, @ConnectedSocket() socket) {
        console.log("newMessagebro", this.count)
        this.count++;
        const {to, from} = body
        const toSocket = this.socketIds.get(to+'')
        const fromSocket = this.socketIds.get(from+'')
        const fromUser = await this.authService.findUserById(+from)
        const toUser = await this.authService.findUserById(+to)
        const msg = this.messageRepo.create({
            from: fromUser,
            text: body.msg,
            to: toUser
        })
        // KiyLavk8o32c1QiyAAAH
        this.messageRepo.save(msg);
        this.server.to(toSocket.id).emit('onMessage', {
            msg: 'New Message',
            content: msg
        })
    }
}