import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters } from "@nestjs/common";
import { HttpErrorFilter } from "src/filters/http_error.filter";
import { CreateTrainDTO } from "./dto/create-train.dto";
import { UpdateTrainDTO } from "./dto/update-train.dto";
import { TrainService } from "./train.service";

@Controller({
  path: 'api/trains',
})
@UseFilters(HttpErrorFilter)
export class TrainController {
  constructor(protected service: TrainService) {}
  
  @Get()
  async findAll() {
    return await this.service.findAllTrains();
  }

  @Post()
  async create(@Body() createTrainRequest: CreateTrainDTO) {
    return await this.service.createTrain(createTrainRequest);
  }

  @Get(":id")
  async find(@Param("id") id: number) {
    return await this.service.findTrain(id);
  } 

  @Put(":id")
  async update(@Param('id') id: number, @Body() updateTrainRequest: UpdateTrainDTO) {
    return await this.service.updateTrain(id, updateTrainRequest);
  }

  @Delete(":id")
  async remove(@Param("id") id: number) {
    return await this.service.removeTrain(id);
  }
}