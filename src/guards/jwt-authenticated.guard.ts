import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtAdminAuthGuard } from "./jwt-admin.guard";
import { JwtUserAuthGuard } from "./jwt-user.guard";

// Allows admin or user to access.

@Injectable()
export class JwtAuthenticatedGuard implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      let adminGuard = new JwtAdminAuthGuard();
      if (await adminGuard.canActivate(context)) {
        return true;
      }
    }
    // Keep going. Discard the unauthorized exception.
    catch (e: unknown) {}

    try {  
      let userGuard = new JwtUserAuthGuard();
      if (await userGuard.canActivate(context)) {
        return true;
      }

      return false;
    }
    catch (e: unknown) {
      if (e instanceof UnauthorizedException) {
        return false;
      }
    }
  }
}