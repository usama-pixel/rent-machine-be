export class CreatePropertyDto {
    property_name: string;
    price?: number;
    rent?: number;
    property_type: string;
    rooms?: number;
    bathrooms?: number;
    sqft: number;
    description: string;
    address: string;
    image: string;
}