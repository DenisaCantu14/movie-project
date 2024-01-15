import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources/user/user.module';
import { MovieModule } from './resources/movie/movie.module';
import config from '../ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(config), UsersModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
