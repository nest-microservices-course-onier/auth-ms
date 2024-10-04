import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';

import { AuthService } from './auth.service';

import { CreateAuthDto } from './dto/create-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @MessagePattern('auth.register.user')
  create(@Payload() createAuthDto: CreateAuthDto) {
    return this.authService.create(createAuthDto);
  }

  @MessagePattern('auth.login.user')
  login(@Payload() loginAuthDto: LoginAuthDto) {
    return this.authService.create(loginAuthDto);
  }

  @MessagePattern('auth.verify.user')
  verifyToken(@Payload() loginAuthDto: LoginAuthDto) {
    return this.authService.create(loginAuthDto);
  }
  
}
