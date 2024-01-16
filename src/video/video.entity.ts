import { Entity, PrimaryGeneratedColumn, OneToMany, Column } from 'typeorm';

@Entity()
export class Video {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  title: string;

  @Column()
  description: string;
  
  @Column()
  filename: string;

  @Column()
  path: string;

}
