import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAdminAuthGuard } from "src/guards/jwt-admin.guard";
import { JwtAuthenticatedGuard } from "src/guards/jwt-authenticated.guard";
import { AddTypesDTO } from "./dto/train-type.dto";
import { TrainTypeService } from "./train-type.service";

@Controller({ path: 'api/trains/:train_id/types' })
export class TrainTypeController {

  constructor(protected service: TrainTypeService) {}

  @Get("/")
  @UseGuards(JwtAuthenticatedGuard)
  async findAll(@Param('train_id') trainId: number) {
    return await this.service.findTypesOfTrain(trainId);
  }

  @Post("/")
  @UseGuards(JwtAdminAuthGuard)
  async addToTrain(@Param("train_id") trainId: number, @Body() addTypesData: AddTypesDTO) {
    return await this.service.addToTrain(trainId, addTypesData);
  }

  @Delete("/:type_id")
  @UseGuards(JwtAdminAuthGuard)
  async deleteClassFromTrain(@Param("train_id") trainId: number, @Param("type_id") typeId: number) {
    return await this.service.deleteFromTrain(trainId, typeId);
  }

}