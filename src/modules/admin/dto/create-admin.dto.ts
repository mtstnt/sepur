import { IsNotEmpty } from "class-validator";

export class AdminDTO {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
