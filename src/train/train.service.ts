import { Catch, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateTrainDTO as CreateTrainDTO } from "./dto/create-train.dto";
import { UpdateTrainDTO } from "./dto/update-train.dto";
import { TrainEntity } from "./entity/train.entity";

@Injectable()
@Catch()
export class TrainService {
  constructor(
    @InjectRepository(TrainEntity)
    protected trainRepository: Repository<TrainEntity>
  ) { }

  async findAllTrains() {
    return await this.trainRepository.find({ where: { status: true } });
  }

  async findTrain(id: number) {
    return await this.trainRepository.find({ where: { id: id, status: true, } });
  }

  async createTrain(data: CreateTrainDTO) {
    return await this.trainRepository.insert(data);
  }

  async updateTrain(id: number, data: UpdateTrainDTO) {
    return await this.trainRepository.update(id, data);
  }

  async removeTrain(id: number) {
    return await this.trainRepository.update(id, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

}