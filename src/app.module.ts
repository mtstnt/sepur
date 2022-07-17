import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './modules/train/entity/train.entity';
import { TrainModule } from './modules/train/train.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/user/entities/user.entity';
import { Admin } from './modules/admin/entities/admin.entity';
import { AuthAdminModule } from './modules/auth-admin/auth-admin.module';
import { StationModule } from './modules/station/station.module';
import { Province } from './modules/province/entities/province.entity';
import { City } from './modules/city/entities/city.entity';
import { Station } from './modules/station/entities/station.entity';
import { CityModule } from './modules/city/city.module';
import { ProvinceModule } from './modules/province/province.module';
import { TrainTypeModule } from './modules/train-types/train-type.module';
import { TrainType } from './modules/train-types/entity/train-type.entity';
import { Schedule } from './modules/schedule/entities/schedule.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '',
      port: 3306,
      database: 'sepur',
      entities: [Train, User, Admin, Province, City, Station, TrainType, Schedule],
      synchronize: true,
    }),
    TrainModule,
    TrainTypeModule,
    AdminModule,
    UserModule,
    ScheduleModule,
    AuthModule,
    AuthAdminModule,
    StationModule,
    CityModule,
    ProvinceModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
