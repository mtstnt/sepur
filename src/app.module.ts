import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Train } from './modules/train/entity/train.entity';
import { TrainModule } from './modules/train/train.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '',
      port: 3306,
      database: 'sepur',
      entities: [Train],
      synchronize: true,
    }),
    TrainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
