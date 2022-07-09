import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdminDTO } from './dto/create-admin.dto';
import { Admin } from './entities/admin.entity';

@Injectable()
export class AdminService {

  @InjectRepository(Admin)
  protected repository: Repository<Admin>;

  create(createAdminDto: AdminDTO) {
    return 'This action adds a new admin';
  }

  findAll() {
    return `This action returns all admin`;
  }

  findOne(id: number) {
    return `This action returns a #${id} admin`;
  }

  update(id: number, updateAdminDto: AdminDTO) {
    return `This action updates a #${id} admin`;
  }

  remove(id: number) {
    return `This action removes a #${id} admin`;
  }

  async findAdmin(username: string) {
    return await this.repository.findOne({ where: { status: true, username: username } });
  }
}
