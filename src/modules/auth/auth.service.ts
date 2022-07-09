import { Catch, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { User } from "../user/entities/user.entity";
import { UserService } from "../user/user.service";
import * as bcrypt from 'bcrypt';
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Injectable()
@Catch(UnauthorizedException)
export class AuthService {
  constructor(
    protected userService: UserService,
    protected jwtService: JwtService
  ) { }

  async login(loginRequest: AuthLoginDTO) {
    let user = await this.authenticateUser(loginRequest.email, loginRequest.password);
    if (user instanceof User) {
      const payload = { email: user.email, sub: user.id };
      return {
        access_token: this.jwtService.sign(payload),
      }
    }
    throw new UnauthorizedException();
  }

  async register(registerRequest: AuthRegisterDTO) {
    let user = await this.userService.register(registerRequest.email, registerRequest.password, registerRequest.first_name, registerRequest.last_name);

    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    }
  }

  private async authenticateUser(email: string, password: string) {
    let user = await this.userService.findUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    if (!bcrypt.compareSync(password, user.password)) {
      throw new UnauthorizedException();
    }
    return user;
  }
}