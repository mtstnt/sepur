import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './entity/train.entity';
import { TrainController } from './train.controller';
import { TrainService } from './train.service';

@Module({
  imports: [TypeOrmModule.forFeature([Train])],
  controllers: [TrainController],
  providers: [TrainService],
})
export class TrainModule {}
