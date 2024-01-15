import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from '../../database/user/types/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserEntity[]> {
    return await this.userRepository.find();
  }

  async getById(id: number): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: { id },
      relations: [
        'categories',
        'movies',
        'movies.categories',
        'movies.tags',
        'movies.photos',
      ],
    });
  }
}
