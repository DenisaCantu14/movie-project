import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Movie } from './movie.entity';

@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Movie, (movie) => movie.category)
  movies: Movie[];
}
