export interface Property {
    key: string;
    _id : string;
    title : string;
    slug : string;
    location : string;
    description : string;
    price : number;
    type : string;
    status : string;
    area : number;    
    property_image : string;
}

export interface PropertyData { 
    propertyData: Property[];
}
