import { Catch, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { CityService } from "../city/city.service";
import { City } from "../city/entities/city.entity";
import { CreateStationDTO, UpdateStationDTO } from "./dto/station.dto";
import { Station } from "./entities/station.entity";

@Injectable()
@Catch(QueryFailedError)
export class StationService {

  @InjectRepository(Station)
  protected repository: Repository<Station>;

  constructor(protected cityService: CityService) {}

  async findAll(): Promise<Station[]> {
    return await this.repository.find({ where: { status: true }, relations: ["city.province"] });
  }

  async find(id: number): Promise<Station> {
    let station = await this.repository.findOne({ where: { id: id, status: true }, relations: ["city.province"] });
    if (!station) {
      throw new NotFoundException();
    }
    return station;
  }

  async create(data: CreateStationDTO): Promise<Station|null> {
    let station = this.repository.create();
    station.name = data.name;

    let city = await this.cityService.find(data.city_id);
    if (!city) {
      throw new NotFoundException();
    }
    station.city = city;

    let insertResult = await this.repository.insert(station);
    return await this.repository.findOne({ where: { id: insertResult.identifiers[0]["id"] }, relations: ["city.province"] });
  }

  async update(id: number, data: UpdateStationDTO): Promise<Station|null> {
    let station = await this.repository.findOneBy({ id: id });
    
    if (data.city_id) {
      let city = new City();
      city.id = data.city_id;
      station.city = city;
    }

    if (data.name) {
      station.name = data.name;
    }

    await this.repository.save(station);
    return await this.repository.findOne({ where: { id: id }, relations: ["city.province"] });
  }

  async remove(id: number): Promise<void> {
    await this.repository.update({ id: id }, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }
}