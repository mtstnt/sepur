import { Body, Controller, Delete, Get, Param, Post, Put, UseFilters, UseGuards } from "@nestjs/common";
import { HttpErrorFilter } from "src/filters/http_error.filter";
import { JwtAdminAuthGuard } from "src/guards/jwt-admin.guard";
import { JwtAuthenticatedGuard } from "src/guards/jwt-authenticated.guard";
import { CreateStationDTO, UpdateStationDTO } from "./dto/station.dto";
import { StationService } from "./station.service";

@Controller({ path: '/api/stations' })
@UseFilters(HttpErrorFilter)
export class StationController {
  
  constructor(protected service: StationService) { }

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
  async create(@Body() createRequest: CreateStationDTO) {
    return await this.service.create(createRequest);
  }

  @Put(":id")
  @UseGuards(JwtAdminAuthGuard)
  async update(@Param('id') id: number, @Body() updateRequest: UpdateStationDTO) {
    return await this.service.update(id, updateRequest);
  }

  @Delete(":id")
  @UseGuards(JwtAdminAuthGuard)
  async remove(@Param("id") id: number) {
    return await this.service.remove(id);
  }
}