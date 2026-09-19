import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import bcrypt from 'bcrypt';

import { DatabaseService } from '../database/database.service.js';

import { RegisterDto } from './dto/register.dto.js';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  constructor(
    private readonly databaseService: DatabaseService,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerDto: RegisterDto) {
    const { name, email, password } = registerDto;

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
      const result = await this.databaseService.query(
        `INSERT INTO users (name, email, password)
         VALUES ($1, $2, $3)
         RETURNING id, name, email`,
        [name, email, hashedPassword],
      );

      return result.rows[0];
    } catch (error: unknown) {
      if (
        error &&
        typeof error === 'object' &&
        'code' in error &&
        error.code === '23505'
      ) {
        throw new ConflictException('Email already exists');
      }

      throw error;
    }
  }

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    const result = await this.databaseService.query(
      `SELECT id, name, email, password
       FROM users
       WHERE email = $1`,
      [email],
    );

    if (result.rows.length === 0) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const user = result.rows[0];

    const isPasswordValid = await bcrypt.compare(
      password,
      user.password,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException(
        'Invalid email or password',
      );
    }

    const payload = {
      sub: user.id,
      email: user.email,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    return {
      access_token: accessToken,
    };
  }
}