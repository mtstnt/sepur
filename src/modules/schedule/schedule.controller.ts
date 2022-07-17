import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Query, Put } from '@nestjs/common';
import { ScheduleService } from './schedule.service';
import { CreateScheduleDTO } from './dto/create-schedule.dto';
import { UpdateScheduleDTO } from './dto/update-schedule.dto';
import { Request } from 'express';

@Controller('/api/schedules')
export class ScheduleController {
  constructor(private readonly scheduleService: ScheduleService) {}

  @Post()
  async create(@Body() createScheduleDto: CreateScheduleDTO) {
    return await this.scheduleService.create(createScheduleDto);
  }

  @Get()
  async findAll(
    @Query('departure_date') departureDate?: string,
    @Query('arrival_date') arrivalDate?: string,
    @Query('from') from?: number,
    @Query('to') to?: number 
  ) {
    return await this.scheduleService.findAll({ 
      departureDate: departureDate, 
      arrivalDate: arrivalDate, 
      fromStation: from, 
      toStation: to 
    });
  }

  @Get(':id')
  async findOne(@Param('id') id: number) {
    return await this.scheduleService.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() updateScheduleDto: UpdateScheduleDTO) {
    return this.scheduleService.update(id, updateScheduleDto);
  }

  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.scheduleService.remove(id);
  }
}
