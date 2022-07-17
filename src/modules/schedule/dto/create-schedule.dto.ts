export class CreateScheduleDTO {
  // Train detail id
  train: number;
  
  station_from: number;
  station_to: number;

  departure_timestamp: number;
  arrival_timestamp: number;

  seat_capacity: number;
  price: number;
}
