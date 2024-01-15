import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { MovieEntity } from './movie.entity';
import { Tag } from './tag.entity';

@Entity({ name: 'movies_tags' })
export class MovieCategory {
  @PrimaryColumn()
  movieId: number;

  @PrimaryColumn()
  tagId: number;

  @ManyToOne(() => MovieEntity, (movie) => movie.tags)
  @JoinColumn({ name: 'movieId' })
  movie: MovieEntity;

  @ManyToOne(() => Tag, (tag) => tag.movies)
  @JoinColumn({ name: 'tagId' })
  tag: Tag;
}
