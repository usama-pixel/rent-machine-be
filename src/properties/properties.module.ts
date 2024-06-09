import { Module } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { PropertiesController } from './properties.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Property } from '../typeorm/entities/Property';
import { JwtStrategy } from 'src/auth/strategies/jwt.strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([Property]),
  ],
  controllers: [PropertiesController],
  providers: [PropertiesService, JwtStrategy],
})
export class PropertiesModule {}
