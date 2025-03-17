import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto/auth.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@ApiTags('Authentication') // Swagger bolimi
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Foydalanuvchini royxatdan otkazish' })
  @ApiResponse({ status: 201, description: 'Foydalanuvchi muvaffaqiyatli royxatdan otdi' })
  @ApiResponse({ status: 400, description: 'Ushbu telefon raqam allaqachon mavjud' })
  @Post('register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('login')
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
}
