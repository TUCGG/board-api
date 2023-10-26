import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: '127.0.0.1',
  port: 3306,
  username: 'root',
  password: 'bbc1234567890',
  database: 'boarddb',
  synchronize: true,
  logging: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
};
