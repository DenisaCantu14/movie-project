import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { MovieEntity } from './movie.entity';

@Entity('photos')
export class Photo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  url: string;

  @ManyToOne(() => MovieEntity, (movie) => movie.photos)
  movie: MovieEntity;
}
