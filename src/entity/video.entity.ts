import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;

  @Column()
  videoPath: string;

  @Column()
  thumbnailPath: string
}
