import { Body, Controller, Delete, Get, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { User } from 'src/typeorm/entities/User.entity';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  
  @Post('')
  @UseGuards(JwtAuthGuard)
  createProperty(@Req() req: Request, @Body() data: any) {
    // return data;
    return this.propertiesService.createProperty(data, req.user);
  }
  @Get('')
  @UseGuards(JwtAuthGuard)
  getProperties(@Req() req: Request) {
    // const {id: userId} = req.user as User;
    // console.log("BROOO", userId)
    // if(!userId) throw new NotFoundException('userId is undefined');
    return this.propertiesService.getProperties();
  }

  @Delete()
  @UseGuards(JwtAuthGuard)
  deleteProperty(@Req() req: Request) {
    const id = req.query.propertyId;
    if(!id) throw new NotFoundException('propertyId is undefined');
    return this.propertiesService.deleteProperty(+id);
  }
}
