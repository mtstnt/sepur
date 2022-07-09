import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "../auth.service";
import { AuthConstants } from "../constants";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: AuthConstants.JWT_SECRET_KEY,
    });
  }

  async validate(payload: any) {
    return { userID: payload.sub, email: payload.email };
  }

}