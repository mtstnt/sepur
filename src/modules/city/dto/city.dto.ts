import { IsNotEmpty } from "class-validator";

export class CreateCityDTO {
  name: string;
  province_id: number;
}

export class UpdateCityDTO {
  name?: string;
  province_id?: number;
}