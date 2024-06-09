import { Body, Controller, Get, NotFoundException, Post, Req, UseGuards } from '@nestjs/common';
import { PropertiesService } from './properties.service';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('properties')
export class PropertiesController {
  constructor(private readonly propertiesService: PropertiesService) {}
  
  @Post('')
  @UseGuards(JwtAuthGuard)
  createProperty(@Body() data: any) {
    // return data;
    return this.propertiesService.createProperty(data);
  }
  @Get('')
  @UseGuards(JwtAuthGuard)
  getProperties(@Req() req: Request) {
    const id = req.params.id;
    if(!id) throw new NotFoundException('userId is undefined');
    return this.propertiesService.getProperties(+id);
  }
}
