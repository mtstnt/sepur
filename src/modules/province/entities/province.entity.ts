import { Exclude } from "class-transformer";
import { City } from "src/modules/city/entities/city.entity";
import { Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity({ name: 'm_provinces' })
export class Province {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @OneToMany(() => City, (city) => city.province, { onDelete: 'CASCADE' })
  cities: City[];

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