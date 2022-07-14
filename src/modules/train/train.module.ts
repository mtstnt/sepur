import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainType } from './entity/train-type.entity';
import { Train } from './entity/train.entity';
import { TrainTypeController } from './train-type.controller';
import { TrainTypeService } from './train-type.service';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';

@Module({
  imports: [TypeOrmModule.forFeature([Train, TrainType])],
  controllers: [TrainController, TrainTypeController],
  providers: [TrainService, TrainTypeService],
})
export class TrainModule {}
