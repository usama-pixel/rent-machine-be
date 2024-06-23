import { Module } from "@nestjs/common";
import { MyGateway } from "./gateway";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Message } from "../typeorm/entities/Message";
import { AuthService } from "../auth/auth.service";
import { AuthModule } from "../auth/auth.module";

@Module({
    imports: [
        TypeOrmModule.forFeature([Message]),
        AuthModule
    ],// Register the User entity]
    providers: [MyGateway,]
})
export class GatewayModule {}