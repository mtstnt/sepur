import { Catch, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { use } from 'passport';
import { QueryFailedError, Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
@Catch(QueryFailedError)
export class UserService {
  @InjectRepository(User)
  protected repository: Repository<User>;
  
  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async findUser(email: string): Promise<User|null> {
    return await this.repository.findOne({
      where: { email: email, status: true }
    });
  }

  async register(email: string, password: string, firstName: string, lastName: string) {
    let user = new User();
    user.email = email;
    user.password = bcrypt.hashSync(password, 10);
    user.firstName = firstName;
    user.lastName = lastName;

    await this.repository.insert(user);

    return user;
  }
}
