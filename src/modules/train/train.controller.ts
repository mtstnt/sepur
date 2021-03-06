import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { HttpErrorFilter } from "src/filters/http_error.filter";
import { JwtAdminAuthGuard } from "src/guards/jwt-admin.guard";
import { JwtAuthenticatedGuard } from "src/guards/jwt-authenticated.guard";
import { JwtUserAuthGuard } from "src/guards/jwt-user.guard";
import { CreateTrainDTO } from "./dto/create-train.dto";
import { UpdateTrainDTO } from "./dto/update-train.dto";
import { TrainService } from "./train.service";

@Controller({
  path: 'api/trains',
})
@UseFilters(HttpErrorFilter)
export class TrainController {
  constructor(protected service: TrainService) {}
  
  // Allow any logged in
  @Get()
  @UseGuards(JwtAuthenticatedGuard)
  async findAll() {
    return await this.service.findAll();
  }

  @Get(":id")
  @UseGuards(JwtAuthenticatedGuard)
  async find(@Param("id") id: number) {
    return await this.service.find(id);
  } 

  // Allow admin only
  @UseGuards(JwtAdminAuthGuard)
  @Post()
  async create(@Body() createTrainRequest: CreateTrainDTO) {
    return await this.service.create(createTrainRequest);
  }

  @Put(":id")
  @UseGuards(JwtAdminAuthGuard)
  async update(@Param('id') id: number, @Body() updateTrainRequest: UpdateTrainDTO) {
    return await this.service.update(id, updateTrainRequest);
  }

  @Delete(":id")
  @UseGuards(JwtAdminAuthGuard)
  async remove(@Param("id") id: number) {
    return await this.service.remove(id);
  }
}