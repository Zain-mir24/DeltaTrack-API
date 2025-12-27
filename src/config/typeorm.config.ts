import { TypeOrmModuleOptions } from '@nestjs/typeorm';

var dotenv = require('dotenv');
var dotenvExpand = require('dotenv-expand');

var myEnv = dotenv.config();
const myvalue = dotenvExpand.expand(myEnv).parsed;

const databaseUsername =myvalue.DATABASE_NAME;
const databasePassword =myvalue.DATABASE_PASSWORD;
const databaseName =myvalue.DATABASE_NAME;
const databaseHost =myvalue.DATABASE_HOST;
const databasePort = myvalue.DATABASE_PORT;
const databaseType=myvalue.DATABASE_TYPE;


export const typeOrmConfig: TypeOrmModuleOptions = {
  type: databaseType,
  host: databaseHost,
  port: databasePort,
  username: databaseUsername,
  password: databasePassword,
  database: databaseName,
  entities: [__dirname + '/../**/*.entity{.ts,.js}'],
  synchronize: true,

};