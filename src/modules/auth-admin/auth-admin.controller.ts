import { Body, Catch, Controller, Post } from "@nestjs/common";
import { AuthAdminService } from "./auth-admin.service";
import { AuthAdminLoginDTO } from "./dto/auth-admin-login.dto";

@Controller({ path: 'api/auth/admin' })
export class AuthAdminController {
  constructor(protected service: AuthAdminService) { }
  
  @Post('login')
  async login(@Body() loginRequest: AuthAdminLoginDTO) {
    return await this.service.login(loginRequest);
  }
}