import { Catch, Injectable, UseInterceptors } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTrainDTO as CreateTrainDTO } from "./dto/create-train.dto";
import { UpdateTrainDTO } from "./dto/update-train.dto";
import { Train } from "./entity/train.entity";

@Injectable()
@Catch()
export class TrainService {

  @InjectRepository(Train)
  protected repository: Repository<Train>

  async findAll() {
    return await this.repository.find({ where: { status: true } });
  }

  async find(id: number) {
    return await this.repository.find({ where: { id: id, status: true, } });
  }

  async create(data: CreateTrainDTO) {
    let result = await this.repository.insert(data);
    return await this.repository.findBy({ id: result.identifiers['id'] })
  }

  async update(id: number, data: UpdateTrainDTO) {
    return await this.repository.update(id, data);
  }

  async remove(id: number) {
    return await this.repository.update(id, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

}