import dotenv from 'dotenv';
import fs from 'fs';
import logger from './logger';

if (fs.existsSync('.env')) {
  logger.debug('Using .env file to supply config environment variables');
  dotenv.config({ path: '.env' });
} else {
  logger.warn(
    'Using .env.example file to supply config environment variables',
  );
  dotenv.config({ path: '.env.example' });
}

export enum ServerType {
  WEB = 'WEB',
  WEB_WORKER= 'WEB_WORKER',
  WORKER = 'WORKER',
}

interface IRequiredSecrets {
  SESSION_SECRET: string;
  REDIS_HOST: string;
  REDIS_PORT: string;
  AUTH0_DOMAIN: string;
  AUTH0_CLIENT_ID: string;
  AUTH0_SECRET: string;
  AUTH0_CALLBACK_URL: string;
  PRISMA_ENDPOINT: string;
  PRISMA_SECRET: string;
  AUTH0_AUDIENCE: string;
  GOOGLE_PROJECT_ID: string;
  SERVER_TYPE: ServerType;
  NEW_RELIC_API_KEY: string;
  [key: string]: string;
}

const requiredSecrets: IRequiredSecrets = {
  SESSION_SECRET: '',
  REDIS_HOST: '',
  REDIS_PORT: '',
  AUTH0_DOMAIN: '',
  AUTH0_CLIENT_ID: '',
  AUTH0_SECRET: '',
  AUTH0_CALLBACK_URL: '',
  PRISMA_ENDPOINT: '',
  PRISMA_SECRET: '',
  AUTH0_AUDIENCE: '',
  GOOGLE_PROJECT_ID: '',
  NEW_RELIC_API_KEY: '',
  SERVER_TYPE: ServerType.WEB_WORKER,
};

Object.keys(requiredSecrets).map((key) => {
  const processVar = process.env[key];
  requiredSecrets[key] = processVar;
});

export default requiredSecrets;
