import { Module } from '@nestjs/common';
import { MovieController } from './movie.controller';
import { MovieService } from './movie.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Movie } from './entity/movie.entity';
import { Category } from './entity/category.entity';
import { Tag } from './entity/tag.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Movie, Category, Tag])],
  controllers: [MovieController],
  providers: [MovieService],
})
export class MovieModule {}
