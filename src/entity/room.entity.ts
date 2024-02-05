import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Video } from './video.entity';

@Entity()
export class Room {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Video, (video) => video.id)
  video: Video;

  @Column()
  roomPath: string

  @Column()
  hostName: string
}
