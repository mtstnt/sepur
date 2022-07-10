import { Exclude } from "class-transformer";
import { City } from "src/modules/city/entities/city.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'm_stations' })
export class Station {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => City, { onDelete: 'CASCADE' })
  city: City;

  @Column({ default: true })
  @Exclude()
  status: boolean;

  @CreateDateColumn({ name: 'created_at' })
  @Exclude()
  createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  @Exclude()
  updatedAt: Date;

  @DeleteDateColumn({ name: 'deleted_at', nullable: true, default: null })
  @Exclude()
  deletedAt: Date;
}