import { IsNotEmpty } from "class-validator";

export class ProvinceDTO {
  @IsNotEmpty()
  name: string;
}