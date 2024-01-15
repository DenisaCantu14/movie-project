import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { UserEntity } from '../../user/types/user.entity';

@Entity({ name: 'users_movies' })
export class MovieCategory {
  @PrimaryColumn()
  movieId: number;

  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.categories)
  @JoinColumn({ name: 'movieId' })
  movie: MovieEntity;

  @ManyToOne(() => UserEntity, (user) => user.movies)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;
}
