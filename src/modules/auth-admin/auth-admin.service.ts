import { Catch, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as bcrypt from 'bcrypt';
import { AuthAdminLoginDTO } from "./dto/auth-admin-login.dto";
import { AdminService } from "../admin/admin.service";
import { Admin } from "../admin/entities/admin.entity";

@Injectable()
@Catch(UnauthorizedException)
export class AuthAdminService {
  constructor(
    protected adminService: AdminService,
    protected jwtService: JwtService
  ) { }

  async login(loginRequest: AuthAdminLoginDTO) {
    let admin = await this.authenticateUser(loginRequest.username, loginRequest.password);
    if (admin instanceof Admin) {
      const payload = { email: admin.username, sub: admin.id };
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
    throw new UnauthorizedException();
  }

  private async authenticateUser(username: string, password: string) {
    let admin = await this.adminService.findAdmin(username);
    if (!admin) {
      throw new UnauthorizedException();
    }
    if (!bcrypt.compareSync(password, admin.password)) {
      throw new UnauthorizedException();
    }
    return admin;
  }
}