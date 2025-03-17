    import { Injectable, BadRequestException } from '@nestjs/common';
    import { InjectModel } from '@nestjs/mongoose';
    import { Model } from 'mongoose';
    import * as bcrypt from 'bcrypt';
    import { User, UserDocument } from '../user/schemas/user.schema';
    import { RegisterDto, LoginDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';

    @Injectable()
    export class AuthService {
      constructor(@InjectModel(User.name) private userModel: Model<UserDocument>,
      private jwtService: JwtService) {}

      async register(registerDto: RegisterDto) {
        const { name, phone, password } = registerDto;

        const existingUser = await this.userModel.findOne({ phone });
        if (existingUser) {
          throw new BadRequestException('Ushbu telefon raqam allaqachon royxatdan otgan');
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new this.userModel({ name, phone, password: hashedPassword });
        
        await user.save();
        return { message: 'Foydalanuvchi muvaffaqiyatli royxatdan otdi' };
      }

      async login(loginDto: LoginDto) {
        const { phone, password } = loginDto;
        const user = await this.userModel.findOne({ phone });
    
        if (!user || !(await bcrypt.compare(password, user.password))) {
          throw new BadRequestException('Telefon yoki parol notogri');
        }
    
        const payload = { id: user._id, phone: user.phone, name: user.name };
        const token = this.jwtService.sign(payload);
    
        return {
          token,
        };
      }
    
    }
