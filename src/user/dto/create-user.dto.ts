export class CreateUserDto {
    name: string;
    phone: string;
    password: string;
    type?: string;
    region?: string;
    shortName?: string;
    location?: string;
    image?: string;
  }
  
  export class UpdateUserDto {
    name?: string;
    phone?: string;
    password?: string;
    type?: string;
    region?: string;
    shortName?: string;
    location?: string;
    image?: string;
  }
  