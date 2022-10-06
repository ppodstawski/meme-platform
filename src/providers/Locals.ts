import { Application } from 'express';
import * as path from 'path';
import * as dotenv from 'dotenv';

class Locals {
  public static config(): any {
    dotenv.config({ path: path.join(__dirname, '../../.env') });

    const dbUser = process.env.DATABASE_USER;
    const dbPassword = process.env.DATABASE_PASSWORD;
    const dbName = process.env.DATABASE_NAME;
    const appPort = process.env.APP_PORT;
    const appHost = process.env.APP_HOST;
    const appName = process.env.APP_NAME;
    const appDescription = process.env.APP_DESCRIPTION;
    const appSecret = process.env.APP_SECRET;

    return {
      dbUser,
      dbPassword,
      dbName,
      appPort,
      appHost,
      appName,
      appDescription,
      appSecret
    };
  }

  public static init(expressApp: Application) {
    expressApp.locals.env = this.config();
  }
}

export default Locals;
