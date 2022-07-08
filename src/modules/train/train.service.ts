import { Catch, Injectable } from "@nestjs/common";
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

  async findAllTrains() {
    return await this.repository.find({ where: { status: true } });
  }

  async findTrain(id: number) {
    return await this.repository.find({ where: { id: id, status: true, } });
  }

  async createTrain(data: CreateTrainDTO) {
    return await this.repository.insert(data);
  }

  async updateTrain(id: number, data: UpdateTrainDTO) {
    return await this.repository.update(id, data);
  }

  async removeTrain(id: number) {
    return await this.repository.update(id, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

}