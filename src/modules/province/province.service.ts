import { Catch, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { QueryFailedError, Repository } from "typeorm";
import { City } from "../city/entities/city.entity";
import { ProvinceDTO } from "./dto/province.dto";
import { Province } from "./entities/province.entity";

@Injectable()
@Catch(QueryFailedError)
export class ProvinceService {

  @InjectRepository(Province)
  protected repository: Repository<Province>;

  async findAll(): Promise<Province[]> {
    return await this.repository.findBy({ status: true });
  }

  async find(id: number): Promise<Province> {
    let province = await this.repository.findOneBy({ id: id, status: true });
    if (!province) {
      throw new NotFoundException();
    }
    return province;
  }

  async create(data: ProvinceDTO) {
    let insertResult = await this.repository.insert(data);
    return await this.repository.findOneBy({ id: insertResult.identifiers[0]["id"] });
  }

  async update(id: number, data: ProvinceDTO): Promise<Province|null> {
    await this.repository.update(id, data);
    return await this.repository.findOneBy({ id: id });
  }

  async remove(id: number): Promise<void> {
    await this.repository.update(id, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

}