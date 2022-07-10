import { Body, Catch, Controller, Delete, ForbiddenException, Get, Param, Post, Put, UnauthorizedException, UseFilters, UseGuards } from "@nestjs/common";
import { HttpErrorFilter } from "src/filters/http_error.filter";
import { JwtAdminAuthGuard } from "src/guards/jwt-admin.guard";
import { JwtAuthenticatedGuard } from "src/guards/jwt-authenticated.guard";
import { QueryFailedError } from "typeorm";
import { ProvinceDTO } from "./dto/province.dto";
import { ProvinceService } from "./province.service";

@Controller({ path: '/api/province' })
export class ProvinceController {
  constructor(protected service: ProvinceService) { }

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
  async create(@Body() createRequest: ProvinceDTO) {
    return await this.service.create(createRequest);
  }

  @Put(":id")
  @UseGuards(JwtAdminAuthGuard)
  async update(@Param('id') id: number, @Body() updateRequest: ProvinceDTO) {
    return await this.service.update(id, updateRequest);
  }

  @Delete(":id")
  @UseGuards(JwtAdminAuthGuard)
  async remove(@Param("id") id: number) {
    return await this.service.remove(id);
  }
}