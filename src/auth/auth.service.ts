import { Injectable, Logger } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../typeorm/entities/User.entity';
import { CreateUserDto } from './dto/create-user.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private jwtService: JwtService,
        @InjectRepository(User) private readonly userRepo: Repository<User>
    ) {}
    async validateUser({username, password}: AuthPayloadDto) {
        const findUser = await this.userRepo.findOneBy({email: username});
        // this.logger.log({findUser})
        if(!findUser) return null;
        const isMatch = await bcrypt.compare(password, findUser.password);
        if(isMatch) {
            const {password, ...user} = findUser;
            return this.generateToken(user);
        }
    }
    async generateToken(data: any) {
        return this.jwtService.sign(data);
    }
    async findUserByEmail(email: string) {
        const user = await this.userRepo.findOneBy({email})
        return user
    }
    async findUserById(id: number) {
        const user = await this.userRepo.findOne({where: {id}});
        return user;
    }
    async createUser(userDto: CreateUserDto) {
        if(userDto.password) {
            const salt = +(process.env.SALT || 10);
            userDto.password = await bcrypt.hash(userDto.password, salt);
        }
        const newUser = this.userRepo.create(userDto)
        return this.userRepo.save(newUser)
    }
}
