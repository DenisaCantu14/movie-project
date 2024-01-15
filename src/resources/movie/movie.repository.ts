import { Repository } from 'typeorm';
import { MovieEntity } from '../../database/movie/types/movie.entity';

export class MovieRepository extends Repository<MovieEntity> {}
