import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';

enum UsersRole {
  ADMIN = 'admin',
  USER = 'user',
}

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;
  
  @Column({ default: null })
  token: string;

  @Column({ default: UsersRole.USER })
  role: UsersRole;

}
