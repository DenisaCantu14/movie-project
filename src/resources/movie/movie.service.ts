import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Movie } from './entity/movie.entity';
import { Category } from './entity/category.entity';

@Injectable()
export class MovieService {
  constructor(
    @InjectRepository(Movie)
    private movieRepository: Repository<Movie>,

    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async getAll(): Promise<Movie[]> {
    return this.movieRepository.find({
      relations: ['tags', 'photos'],
    });
  }

  async getAllByCategory(categoryName: string): Promise<Movie[]> {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.category', 'category')
      .where('category.name = :categoryName', { categoryName })
      .getMany();
  }

  async getAllByTag(tagName: string): Promise<Movie[]> {
    return await this.movieRepository
      .createQueryBuilder('movie')
      .leftJoinAndSelect('movie.tags', 'tag') // Include all categories
      .where((qb) => {
        const subQuery = qb
          .subQuery()
          .select('movie.id')
          .from('Movie', 'movie')
          .leftJoin('movie.tags', 'targetTag')
          .where('targetTag.name = :tagName', { tagName })
          .getQuery();
        return `movie.id IN ${subQuery}`;
      })
      .getMany();
  }
}
