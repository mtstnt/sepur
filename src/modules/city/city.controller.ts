import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { JwtAdminAuthGuard } from "src/guards/jwt-admin.guard";
import { JwtAuthenticatedGuard } from "src/guards/jwt-authenticated.guard";
import { CreateCityDTO, UpdateCityDTO } from "./dto/city.dto";
import { CityService } from "./city.service";

@Controller({ path: '/api/city' })
export class CityController {

  constructor(protected service: CityService) { }

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
  async create(@Body() createRequest: CreateCityDTO) {
    return await this.service.create(createRequest);
  }

  @Put(":id")
  @UseGuards(JwtAdminAuthGuard)
  async update(@Param('id') id: number, @Body() updateRequest: UpdateCityDTO) {
    return await this.service.update(id, updateRequest);
  }

  @Delete(":id")
  @UseGuards(JwtAdminAuthGuard)
  async remove(@Param("id") id: number) {
    return await this.service.remove(id);
  }
}