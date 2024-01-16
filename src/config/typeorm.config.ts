import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeormConfig: TypeOrmModuleOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'postgres',
  password: 'ht3aa',
  database: 'fakedb',
  schema: 'public',
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,
};

