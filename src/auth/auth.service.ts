import { Injectable, OnModuleInit } from '@nestjs/common';
import { RpcException } from '@nestjs/microservices';
import { PrismaClient } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import * as bcryptjs from 'bcryptjs';

import { RegisterAuthDto } from './dto/register-auth.dto';
import { LoginAuthDto } from './dto/login-auth.dto';
import { JwtPayload } from './interfaces/jwt-payload.interface';
import { envs } from '../config/envs';

@Injectable()
export class AuthService extends PrismaClient implements OnModuleInit {

  onModuleInit() {
    this.$connect();
    console.log('MongoDB connected');
  }

  constructor(
    private readonly jwtService: JwtService,
  ) {
    super();
  }

  async singJWT(payload: JwtPayload) {
    return this.jwtService.sign(payload);
  }

  async verify(token: string) {
    try {
      const { sub, iat, exp, ...user } = this.jwtService.verify(token, {
        secret: envs.jwtSecret,
      });

      return {
        user,
        token: await this.singJWT(user),
      }

    } catch (error) {
      throw new RpcException({
        status: 401,
        message: 'Invalid token',
      });
    }
  }

  async register(registerAuthDto: RegisterAuthDto) {
    const { email, name, password } = registerAuthDto;
    try {

      const user = await this.user.findUnique({
        where: { email },
      });

      if (user) {
        throw new RpcException({
          status: 400,
          message: 'User already exists',
        });
      }

      const newUser = await this.user.create({
        data: {
          email,
          name,
          password: bcryptjs.hashSync(password, 10),
        }
      });

      const { password: __, ...restUser } = newUser;

      return {
        user: restUser,
        token: await this.singJWT(restUser),
      }
      
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      });
    }
  }

  async login(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    try {

      const user = await this.user.findUnique({
        where: { email },
      });

      if (!user) {
        throw new RpcException({
          status: 400,
          message: 'User does not exists',
        });
      }

      const isValidPassword = bcryptjs.compareSync(password, user.password);

      if (!isValidPassword) {
        throw new RpcException({
          status: 400,
          message: 'Invalid credentials',
        });
      }

      const { password: __, ...restUser } = user;

      return {
        user: restUser,
        token: await this.singJWT(restUser),
      }
      
    } catch (error) {
      throw new RpcException({
        status: 400,
        message: error.message,
      })
    }
  }
  
}
