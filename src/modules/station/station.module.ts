import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityModule } from '../city/city.module';
import { Station } from './entities/station.entity';
import { StationController } from './station.controller';
import { StationService } from './station.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Station]),
    CityModule,
  ],
  controllers: [StationController],
  providers: [StationService],
})
export class StationModule {}
