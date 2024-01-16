import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async getAll(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<User> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [
        'categories',
        'movies',
        'movies.category',
        'movies.tags',
        'movies.photos',
      ],
    });
  }
}
