import * as dotenv from 'dotenv';
import { getOsEnv } from '../helpers/path.helper';
import { isStringTrue } from '../helpers/boolean.helper';

dotenv.config();

export const env = {
  app: {
    port: getOsEnv('PORT'),
    secretKey: getOsEnv('APP_SECRET'),
    nodeEnv: getOsEnv('NODE_ENV'),
    url: getOsEnv('APP_URL'),
  },
  db: {
    connection: getOsEnv('TYPEORM_CONNECTION'),
    host: getOsEnv('TYPEORM_HOST'),
    port: Number(getOsEnv('TYPEORM_PORT')),
    username: getOsEnv('TYPEORM_USERNAME'),
    password: getOsEnv('TYPEORM_PASSWORD'),
    name: getOsEnv('TYPEORM_DATABASE'),
    synchronize: isStringTrue(getOsEnv('TYPEORM_SYNCHRONIZE')),
    enititiesDir: getOsEnv('TYPEORM_ENTITIES'),
  }
} as const;
