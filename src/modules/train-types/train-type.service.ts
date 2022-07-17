import { Catch, HttpException, Injectable, UseFilters } from "@nestjs/common";
import { InjectDataSource, InjectRepository } from "@nestjs/typeorm";
import { HttpErrorFilter } from "src/filters/http_error.filter";
import { DataSource, QueryFailedError, Repository } from "typeorm";
import { AddTypesDTO } from "./dto/train-type.dto";
import { TrainType } from "./entity/train-type.entity";

@Injectable()
@UseFilters(HttpErrorFilter)
export class TrainTypeService {

  constructor(
    @InjectRepository(TrainType)
    protected trainTypeRepository: Repository<TrainType>,

    @InjectDataSource()
    protected dataSource: DataSource,
  ) {}

  async findTypesOfTrain(id: number) {
    return await this.trainTypeRepository.find({ where: { status: true, train: { id: id } }, relations: ["train"] });
  }

  async addToTrain(id: number, data: AddTypesDTO) {
    let existing = await this.trainTypeRepository.find({ where: { status: true, train: { id: id } } });
    let existingNames = existing.map(el => el.className);
    let duplicates = data.class_names.filter(el => existingNames.includes(el));

    if (duplicates.length > 0) {
      throw new HttpException("Duplicate entries for " + duplicates.join(", "), 400);
    }

    await this.dataSource.transaction(async entityManager => {
      data.class_names.forEach(className => entityManager.insert(TrainType, { 
        train: { id: id },
        className: className 
      }));
    });

    return await this.trainTypeRepository.find({ where: { status: true, train: { id: id } }});
  }

  async deleteFromTrain(trainId: number, typeId: number) {
    await this.trainTypeRepository.update({ train: { id: trainId }, id: typeId }, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

}