import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MovieEntity } from '../../database/movie/types/movie.entity';
import { Category } from '../../database/movie/types/category.entity';
import { Tag } from '../../database/movie/types/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([MovieEntity, Category, Tag])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
