import { IsNotEmpty } from "class-validator";

export class AuthAdminLoginDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}