import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  length: number;

  @Column({ nullable: true })
  date_released: Date;

  @Column({ nullable: true })
  available_until: Date;

  @ManyToMany(() => Category, (category) => category.movies)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag, (tag) => tag.movies)
  @JoinTable()
  tags: Category[];
}
