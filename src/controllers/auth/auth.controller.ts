import { Post, Body, Query, Get, Req, Inject } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { OptionalApiBearerAuth } from 'src/decorators/bearer-auth.decorator';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { User } from 'src/decorators/user.decorator';
import { UserPayload } from 'src/auth/user-payload.interface';
import { Api } from 'src/decorators/api.decorator';
import { RegisterDto } from './dto/Register.dto';

@Api({
  path: 'auth',
  tag: 'Auth',
  isPublic: true,
})
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @Inject(CACHE_MANAGER) protected cacheManager: Cache,
  ) {}

  @OptionalApiBearerAuth(false)
  @Get('info')
  async info(@User() user: UserPayload) {
    console.log(user);
    const info = {
      name: user.name,
      email: user.email,
    };
    return info;
  }

  @Post('register')
  async refreshToken(@Body() registerDto: RegisterDto) {
    const response = await this.authService.create(registerDto);
    return response;
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const response = await this.authService.login(loginDto);
    return response;
  }
}
