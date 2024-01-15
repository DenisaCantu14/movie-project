import { Controller, Get, Param } from '@nestjs/common';
import { MovieService } from './movie.service';
import { AllMoviesResult } from './results/all-movies.result';
import { MovieEntity } from '../../database/movie/types/movie.entity';

@Controller()
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Get('/movies')
  async getAll(): Promise<AllMoviesResult> {
    return {
      list: await this.movieService.getAll(),
    };
  }

  @Get('category/:categoryName')
  async findAllByCategory(
    @Param('categoryName') categoryName: string,
  ): Promise<MovieEntity[]> {
    return this.movieService.getAllByCategory(categoryName);
  }

  @Get('tag/:tagName')
  async findAllByTag(
    @Param('tagName') tagName: string,
  ): Promise<MovieEntity[]> {
    return this.movieService.getAllByTag(tagName);
  }
}
