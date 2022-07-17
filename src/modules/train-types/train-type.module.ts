import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainModule } from '../train/train.module';
import { TrainType } from './entity/train-type.entity';
import { TrainTypeController } from './train-type.controller';
import { TrainTypeService } from './train-type.service';

@Module({
  imports: [TypeOrmModule.forFeature([TrainType])],
  controllers: [TrainTypeController],
  providers: [TrainTypeService],
})
export class TrainTypeModule {}
