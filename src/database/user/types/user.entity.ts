import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  JoinTable,
  ManyToMany,
} from 'typeorm';
import { Photo } from '../../movie/types/photo.entity';
import { MovieEntity } from '../../movie/types/movie.entity';
import { Category } from '../../movie/types/category.entity';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  phone_number: string;

  @ManyToMany(() => Category, (category) => category.users)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => MovieEntity, (movie) => movie.users)
  @JoinTable()
  movies: MovieEntity[];
}
