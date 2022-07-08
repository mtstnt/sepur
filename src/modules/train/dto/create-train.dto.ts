import { IsNotEmpty } from "class-validator";

export class CreateTrainDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;
}