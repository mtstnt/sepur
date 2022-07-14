import { IsNotEmpty } from "class-validator";

export class TrainTypeDTO {
  @IsNotEmpty()
  class_name: string;
}

export class AddTypesDTO {
  class_names: string[];
}