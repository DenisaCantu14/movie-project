import { Repository } from 'typeorm';
import { UserEntity } from '../../database/user/types/user.entity';

export class UserRepository extends Repository<UserEntity> {
  // Add custom repository methods if needed
}
