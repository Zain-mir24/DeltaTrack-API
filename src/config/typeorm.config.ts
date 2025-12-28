import { TypeOrmModuleOptions } from '@nestjs/typeorm';

var dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand');

var myEnv = dotenv.config();
const myvalue = dotenvExpand.expand(myEnv).parsed;


console.log('DATABASE URL:', process.env.DATABASE_URL);
export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
    url:process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false,
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,

};