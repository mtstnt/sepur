import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './modules/train/entity/train.entity';
import { TrainModule } from './modules/train/train.module';
import { AdminModule } from './modules/admin/admin.module';
import { UserModule } from './modules/user/user.module';
import { ScheduleModule } from './modules/schedule/schedule.module';
import { PurchaseModule } from './modules/purchase/purchase.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '',
      port: 3306,
      database: 'sepur',
      entities: [Train, User],
      synchronize: true,
    }),
    TrainModule,
    AdminModule,
    UserModule,
    ScheduleModule,
    PurchaseModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
