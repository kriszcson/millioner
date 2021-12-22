/* eslint-disable prettier/prettier */
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
/* eslint-disable prettier/prettier */
import { JwtStrategy } from './jwt.strategy';
/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UserModule } from 'src/user/user.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { jwtConstants } from './constants';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UserModule, PassportModule, JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '600s' },
    })
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy, JwtAuthGuard
  ],
  exports: [AuthService],
  controllers: [AuthController]
})

export class AuthModule { }
