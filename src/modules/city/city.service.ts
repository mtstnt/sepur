import { Catch, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { Province } from "../province/entities/province.entity";
import { CreateCityDTO, UpdateCityDTO } from "./dto/city.dto";
import { City } from "./entities/city.entity";

@Injectable()
@Catch(QueryFailedError)
export class CityService {

  @InjectRepository(City)
  protected repository: Repository<City>;

  async findAll(): Promise<City[]> {
    return await this.repository.find({ where: { status: true }, relations: ["province"] });
  }

  async find(id: number): Promise<City> {
    let city = await this.repository.findOne({ where: { id: id }, relations: ["province"] });
    if (!city) {
      throw new NotFoundException();
    }
    return city;
  }

  async create(data: CreateCityDTO): Promise<City|null> {
    let city = this.repository.create();
    city.name = data.name;
    
    let province = new Province();
    province.id = data.province_id;
    city.province = province;

    let insertResult = await this.repository.insert(city);
    return await this.repository.findOne({ where: { id: insertResult.identifiers[0]["id"] }, relations: ["province"] });
  }

  async update(id: number, data: UpdateCityDTO): Promise<City|null> {
    let city = await this.repository.findOne({ where: { id: id } });
    if (city.name) {
      city.name = data.name;
    }

    if (data.province_id != null) {
      let province = new Province();
      province.id = data.province_id;
      city.province = province;
    }

    await this.repository.save(city);
    return await this.repository.findOne({ where: { id: id }, relations: ["province"] });;
  }

  async remove(id: number): Promise<void> {
    await this.repository.update({ id: id }, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

}