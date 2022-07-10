import { Exclude } from "class-transformer";
import { Province } from "src/modules/province/entities/province.entity";
import { Station } from "src/modules/station/entities/station.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'm_cities' })
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => Province, { onDelete: 'CASCADE' })
  province: Province;

  @OneToMany(() => Station, (station) => station.city, { onDelete: 'CASCADE' })
  stations: Station[];

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