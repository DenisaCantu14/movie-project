import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  JoinTable,
} from 'typeorm';
import { MovieEntity } from './movie.entity';
import { UserEntity } from '../../user/types/user.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @ManyToMany(() => MovieEntity, (movie) => movie.categories)
  @JoinTable()
  movies: MovieEntity[];

  @ManyToMany(() => UserEntity, (user) => user.categories)
  @JoinTable()
  users: UserEntity[];
}
