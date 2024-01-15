import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './resources/user/user.module';
import { MovieModule } from './resources/movie/movie.module';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const dbConfig = require('../ormconfig.js');
@Module({
  imports: [TypeOrmModule.forRoot(dbConfig), UsersModule, MovieModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
