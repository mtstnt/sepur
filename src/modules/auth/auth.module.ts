import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '../user/user.module';
import { UserService } from '../user/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { AuthConstants } from './constants';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  providers: [AuthService, JwtStrategy],
  imports: [
    JwtModule.register({
      secret: AuthConstants.JWT_SECRET_KEY,
      signOptions: { expiresIn: '60s', },
    }),
    UserModule, 
    PassportModule
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule { }
