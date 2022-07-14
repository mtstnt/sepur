import { Catch, ConsoleLogger, Injectable, Logger } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { DataSource, EntityManager, InsertResult, Repository } from "typeorm";
import { CreateTrainDTO as CreateTrainDTO } from "./dto/create-train.dto";
import { UpdateTrainDTO } from "./dto/update-train.dto";
import { TrainType } from "./entity/train-type.entity";
import { Train } from "./entity/train.entity";

@Injectable()
@Catch()
export class TrainService {

  protected logger = new ConsoleLogger(TrainService.name);

  constructor(
    @InjectRepository(Train)
    protected trainRepository: Repository<Train>,
    @InjectDataSource()
    protected connection: DataSource,
  ) { }

  async findAll() {
    return await this.trainRepository.find({ where: { status: true }, relations: ["types"] });
  }

  async find(id: number) {
    return await this.trainRepository.find({ where: { id: id, status: true, }, relations: ["types"] });
  }

  // Add train and its types if exists.
  async create(data: CreateTrainDTO) {
    let result: InsertResult;
    await this.connection.transaction(async (manager: EntityManager) => {
      result = await this.trainRepository.insert(data);

      if (data.train_types != null) {
        data.train_types.forEach(className => {
          manager.insert(TrainType, { train: result.identifiers[0]['id'], className: className });
        });
      }
    });

    return await this.trainRepository.findOne({ where: { id: result.identifiers[0]['id'] }, relations: ["types"] })
  }

  async update(id: number, data: UpdateTrainDTO) {
    return await this.trainRepository.update(id, data);
  }

  async remove(id: number) {
    return await this.trainRepository.update(id, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

}