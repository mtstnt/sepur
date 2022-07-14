import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Train } from "./train.entity";

@Entity('train_types')
export class TrainType {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Train, { onDelete: 'CASCADE' })
  train: Train;

  @Column({ name: 'class_name', type: 'varchar', nullable: false })
  className: string;

  @Column({ default: true })
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: Date;
}