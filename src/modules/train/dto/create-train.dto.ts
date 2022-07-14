import { IsNotEmpty } from "class-validator";

export class CreateTrainDTO {
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  description: string;

  train_types?: string[];
}