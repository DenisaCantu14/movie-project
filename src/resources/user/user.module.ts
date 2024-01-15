import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entity/user.entity';
import { Movie } from '../movie/entity/movie.entity';
import { Category } from '../movie/entity/category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Movie, Category])],
  controllers: [UserController],
  providers: [UserService],
})
export class UsersModule {}
