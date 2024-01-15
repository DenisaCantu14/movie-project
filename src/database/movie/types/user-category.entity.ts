import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm';
import { Category } from './category.entity';
import { UserEntity } from '../../user/types/user.entity';

@Entity({ name: 'user_categories' })
export class MovieCategory {
  @PrimaryColumn()
  userIf: number;

  @PrimaryColumn()
  categoryId: number;

  @ManyToOne(() => UserEntity, (user) => user.categories)
  @JoinColumn({ name: 'userId' })
  user: UserEntity;

  @ManyToOne(() => Category, (category) => category.movies)
  @JoinColumn({ name: 'categoryId' })
  category: Category;
}
