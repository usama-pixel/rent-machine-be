import { Injectable } from '@nestjs/common';
import { Property } from '../typeorm/entities/Property';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertiesService {
    constructor(@InjectRepository(Property) private readonly propertyRepo: Repository<Property>) {}
    createProperty(data: any) {
        if(!data.property_type) throw new Error('property_type is required');
        if(!data.description) throw new Error('description is required');
        if(!data.address) throw new Error('address is required');
        const newProperty = this.propertyRepo.create(data)
        return this.propertyRepo.save(newProperty);
    }

    getProperties(userId: number) {
        // return this.propertyRepo.findBy({user: {id: userId}});
    }
}
