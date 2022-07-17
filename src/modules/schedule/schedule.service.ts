import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Between, FindOperator, FindOptionsWhere, Repository } from 'typeorm';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { UpdateScheduleDTO } from './dto/update-schedule.dto';
import { Schedule } from './entities/schedule.entity';

import moment from 'moment';
import { Train } from '../train/entity/train.entity';
import { TrainType } from '../train-types/entity/train-type.entity';
import { Station } from '../station/entities/station.entity';

interface ScheduleSearchFilters {
  departureDate?: string;
  arrivalDate?: string;
  fromStation?: number;
  toStation?: number;
}
@Injectable()
export class ScheduleService {

  constructor(
    @InjectRepository(Schedule)
    protected repository: Repository<Schedule>,
  ) {}

  async create(data: CreateScheduleDTO) {
    let result = await this.repository.insert({
      trainDetail: { id: data.train },
      stationFrom: { id: data.station_from },
      stationTo: { id: data.station_to },
      departureTimestamp: data.departure_timestamp,
      arrivalTimestamp: data.arrival_timestamp,
      price: data.price,
      seatCapacity: data.seat_capacity,
      seatTaken: 0,
      status: true,
    });

    return this.repository.findOne({ 
      where: {
        status: true,
        id: result.identifiers[0]['id'],
      },
      relations: ['trainDetail.train', 'stationFrom.city.province', 'stationTo.city.province']
    });
  }

  async findAll(filters: ScheduleSearchFilters) {
    let searchQuery: FindOptionsWhere<Schedule> = {
      status: true,
    };

    if (filters.departureDate != null) {
      searchQuery.departureTimestamp = this.getOneDayCondition(moment(filters.departureDate, "DD-MM-YYYY"));
    }
    if (filters.arrivalDate != null) {
      searchQuery.arrivalTimestamp = this.getOneDayCondition(moment(filters.arrivalDate, "DD-MM-YYYY"));
    }
    if (filters.fromStation != null) {
      searchQuery.stationFrom = { id: filters.fromStation };
    }
    if (filters.toStation != null) {
      searchQuery.stationTo = { id: filters.toStation };
    }

    return await this.repository.find({
      where: searchQuery,
      order: { departureTimestamp: 'ASC' },
      relations: ['trainDetail.train', 'stationFrom.city.province', 'stationTo.city.province']
    });
  }

  async findOne(id: number) {
    return await this.repository.findOne({
      where: {
        id: id,
        status: true,
      },
      relations: ['trainDetail.train', 'stationFrom.city.province', 'stationTo.city.province']
    });
  }

  async update(id: number, data: UpdateScheduleDTO) {
    let schedule = await this.repository.findOne({ where: { id: id, status: true } });

    if (data.train != null) {
      let trainDetail = new TrainType();
      trainDetail.id = data.train;

      schedule.trainDetail = trainDetail;
    }

    if (data.station_from != null) {
      let stationFrom = new Station();
      stationFrom.id = data.station_from;

      schedule.stationFrom = stationFrom;
    }

    if (data.departure_timestamp != null) {
      schedule.departureTimestamp = data.departure_timestamp;
    }

    if (data.arrival_timestamp != null) {
      schedule.arrivalTimestamp= data.arrival_timestamp;
    }

    if (data.price != null) {
      schedule.price = data.price;
    }

    if (data.seat_capacity != null) {
      schedule.seatCapacity = data.seat_capacity;
    }

    await this.repository.save(schedule);

    return this.repository.findOne({ where: { id: id }, relations: ["trainDetail.train", "stationFrom.city.province", "stationTo.city.province"] })
  }

  async remove(id: number) {
    await this.repository.update(id, {
      status: false,
      deletedAt: () => 'CURRENT_TIMESTAMP',
    });
  }

  private getOneDayCondition(date: moment.Moment): FindOperator<number> {
    return Between(
      date.hour(0).minute(0).second(59).unix(), 
      date.hour(23).minute(59).second(59).unix()
    );
  }
}
