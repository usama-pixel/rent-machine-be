import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { Property } from '../typeorm/entities/Property';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PropertiesService {
    constructor(@InjectRepository(Property) private readonly propertyRepo: Repository<Property>) {}
    createProperty(data: any, user: any) {
        if(!data.property_type) throw new UnprocessableEntityException('property_type is required');
        if(!data.description) throw new UnprocessableEntityException('description is required');
        if(!data.address) throw new UnprocessableEntityException('address is required');
        if(!user || Object.keys(user).length === 0) throw new UnprocessableEntityException('Invalid token or user not found');
        // return user
        const newProperty = this.propertyRepo.create({...data, user})
        return this.propertyRepo.save(newProperty);
    }

    getProperties() {
        return this.propertyRepo.find({relations: ['user']});
    }
    
    deleteProperty(propertyId: number) {
        return this.propertyRepo.delete({id: propertyId});
    }
}
