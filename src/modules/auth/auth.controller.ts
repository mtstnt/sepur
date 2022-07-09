import { Body, Controller, Post } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthLoginDTO } from "./dto/auth-login.dto";
import { AuthRegisterDTO } from "./dto/auth-register.dto";

@Controller({ path: 'api/auth' })
export class AuthController {
  constructor(protected service: AuthService) { }
  
  @Post('login')
  async login(@Body() loginRequest: AuthLoginDTO) {
    return await this.service.login(loginRequest);
  }

  @Post('register')
  async register(@Body() registerRequest: AuthRegisterDTO) {
    return await this.service.register(registerRequest);
  }
}