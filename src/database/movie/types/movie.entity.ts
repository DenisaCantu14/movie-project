import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { Photo } from './photo.entity';
import { UserEntity } from '../../user/types/user.entity';

@Entity('movies')
export class MovieEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  length: number;

  @Column({ nullable: true })
  date_released: Date;

  @Column({ nullable: true })
  available_until: Date;

  @Column({ nullable: true })
  meta_title: string;

  @Column({ nullable: true })
  meta_description: string;

  @ManyToMany(() => Category, (category) => category.movies)
  @JoinTable()
  categories: Category[];

  @ManyToMany(() => Tag, (tag) => tag.movies)
  @JoinTable()
  tags: Category[];

  @OneToMany(() => Photo, (photo) => photo.movie)
  @JoinTable()
  photos: Photo[];

  @ManyToMany(() => UserEntity, (user) => user.movies)
  @JoinTable()
  users: UserEntity[];
}
