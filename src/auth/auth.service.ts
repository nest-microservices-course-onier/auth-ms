import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';

@Injectable()
export class AuthService {


  create(createAuthDto: CreateAuthDto) {
    return 'Create';
  }

  login(loginAuthDto: LoginAuthDto) {
    return 'Login';
  }

  verify() {
    return 'Verify';
  }

  
}
