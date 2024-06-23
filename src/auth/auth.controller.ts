import { Body, ConflictException, Controller, Get, HttpException, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthPayloadDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { LocalGuard } from './guards/local.guard';
import { Request, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt.guard';
import { GoogleGuard } from './guards/google.guard';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}
    @Post('login')
    @UseGuards(LocalGuard)
    login(@Req() req: Request) {
        return req.user; // returning the jwt token
    }

    @Post('signup')
    async signup(@Body() body: AuthPayloadDto) {
        const email = body.username
        console.log({email, 'body.username': body.username})
        const user = await this.authService.findUserByEmail(email);
        console.log({user, body})
        if(user) throw new ConflictException('User already exists');
        return this.authService.createUser({...body, email: body.username});
    }

    @Get('me')
    @UseGuards(JwtAuthGuard)
    me(@Req() req: Request) {
        return req.user;
    }
    
    @Get('status')
    @UseGuards(JwtAuthGuard)
    status(@Req() req: Request) {
        console.log('inside status');
        console.log({u: req.user})
        return 'status';
    }

    @Get('google/login')
    @UseGuards(GoogleGuard)
    async googleLogin() {

    }

    @Get('google/callback')
    @UseGuards(GoogleGuard)
    async callback(@Req() req: Request, @Res() res: Response) {
        const token = await this.authService.generateToken({...req.user});
        res.redirect('http://localhost:3000/home/?token=' + token);
        // return token;
    }
}
