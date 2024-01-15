import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { Category } from './category.entity';

@Entity({ name: 'movies_categories' })
export class MovieCategory {
  @PrimaryColumn()
  movieId: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.categories)
  @JoinColumn({ name: 'movieId' })
  movie: MovieEntity;

  @ManyToOne(() => Category, (category) => category.movies)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
