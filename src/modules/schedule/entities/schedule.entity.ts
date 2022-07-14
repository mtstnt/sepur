import { Station } from "src/modules/station/entities/station.entity";
import { TrainType } from "src/modules/train/entity/train-type.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('schedules')
export class Schedule {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'departure_timestamp', type: 'int', nullable: false })
  departureTimestamp: number;

  @Column({ name: 'arrival_timestamp', type: 'int', nullable: false })
  arrivalTimestamp: number;

  @Column({ name: 'seat_capacity', type: 'int', nullable: false })
  seatCapacity: number;

  @Column({ name: 'seat_taken', type: 'int', default: 0 })
  seatTaken: number;

  @ManyToOne(() => TrainType, { onDelete: 'CASCADE' })
  trainDetail: TrainType;

  @Column({ name: 'price', type: 'int', nullable: false })
  price: number;

  @ManyToOne(() => Station, { onDelete: 'CASCADE' })
  stationFrom: Station;

  @ManyToOne(() => Station, { onDelete: 'CASCADE' })
  stationTo: Station;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}
