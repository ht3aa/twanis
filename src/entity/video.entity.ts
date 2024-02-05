import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from './room.entity';

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


  @OneToMany(() => Room, (room) => room.video)
  rooms: Room[] | null
}
