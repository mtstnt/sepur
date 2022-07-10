import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AdminModule } from '../admin/admin.module';
import { AuthAdminController } from './auth-admin.controller';
import { AuthAdminService } from './auth-admin.service';
import { AuthAdminConstants } from './constants';
import { JwtAdminStrategy } from './strategy/jwt-admin.strategy';

@Module({
  providers: [AuthAdminService, JwtAdminStrategy],
  imports: [
    JwtModule.register({
      secret: AuthAdminConstants.JWT_SECRET_KEY,
      signOptions: { expiresIn: '3600s', },
    }),
    AdminModule, 
    PassportModule
  ],
  controllers: [AuthAdminController],
  exports: [AuthAdminService],
})
export class AuthAdminModule { }
