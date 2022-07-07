import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TrainEntity } from './train/entity/train.entity';
import { TrainModule } from './train/train.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      username: 'root',
      password: '',
      port: 3306,
      database: 'sepur',
      entities: [TrainEntity],
      synchronize: true,
    }),
    TrainModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
