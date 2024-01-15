import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MovieEntity } from '../../database/movie/types/movie.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(MovieEntity)
    private movieRepository: Repository<MovieEntity>,
  ) {}

  async getAll(): Promise<MovieEntity[]> {
    return this.movieRepository.find({
      relations: ['categories', 'tags', 'photos'],
    });
  }

  async getAllByCategory(categoryName: string): Promise<MovieEntity[]> {
    return this.movieRepository
      .createQueryBuilder('movies')
      .innerJoinAndSelect(
        'movies.categories',
        'category',
        'category.name = :categoryName',
        { categoryName },
      )
      .getMany();
  }

  async getAllByTag(tagName: string): Promise<MovieEntity[]> {
    return this.movieRepository
      .createQueryBuilder('movies')
      .innerJoinAndSelect('movies.tags', 'tag', 'tag.name = :tagName', {
        tagName,
      })
      .leftJoinAndSelect('movies.categories', 'category')
      .getMany();
  }
}
