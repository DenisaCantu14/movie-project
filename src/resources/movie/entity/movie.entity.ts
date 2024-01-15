import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Category } from './category.entity';
import { Tag } from './tag.entity';
import { Photo } from './photo.entity';

@Entity('movies')
export class Movie {
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

  @ManyToOne(() => Category, (category) => category.movies)
  category: Category;

  @ManyToMany(() => Tag)
  @JoinTable()
  tags: Tag[];

  @OneToMany(() => Photo, (photo) => photo.movie)
  photos: Photo[];
}
