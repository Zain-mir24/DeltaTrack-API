import { TypeOrmModuleOptions } from '@nestjs/typeorm';

var dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand');

var myEnv = dotenv.config();
const myvalue = dotenvExpand.expand(myEnv).parsed;


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: 'postgres',
    url:process.env.DATABASE_URL,
    ssl: {
    rejectUnauthorized: false,
  },
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,

};