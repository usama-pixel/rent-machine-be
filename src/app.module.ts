import { Global, Logger, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { AuthModule } from './auth/auth.module';
import { User } from './typeorm/entities/User.entity';
import { PropertiesModule } from './properties/properties.module';
import { Property } from './typeorm/entities/Property';
import { GatewayModule } from './gateway/gateway.module';
import { Message } from './typeorm/entities/Message';
import { MessageModule } from './message/message.module';

@Global()
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: +process.env.DB_PORT || 5432,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD+'',
      database: 'rent',
      synchronize: true,
      entities: [User, Property, Message],
    }),
    PassportModule,
    AuthModule,
    PropertiesModule,
    GatewayModule,
    MessageModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger
  ],
})
export class AppModule {}
