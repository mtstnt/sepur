import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { City } from '../city/entities/city.entity';
import { Province } from './entities/province.entity';
import { ProvinceController } from './province.controller';
import { ProvinceService } from './province.service';

@Module({
  imports: [TypeOrmModule.forFeature([Province]), Province],
  providers: [ProvinceService],
  controllers: [ProvinceController],
})
export class ProvinceModule {}
