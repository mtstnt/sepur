import { IsEmail, IsNotEmpty } from "class-validator";

export class CreateStationDTO {
  name: string;
  city_id: number;
}

export class UpdateStationDTO {
  name?: string;
  city_id?: number;
}