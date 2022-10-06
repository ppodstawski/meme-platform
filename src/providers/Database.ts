/**
 * Define Database connection
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { Sequelize } from 'sequelize';
import Locals from './Locals';

class Database {
  public sequelize: Sequelize;

  constructor() {
    this.sequelize = new Sequelize(
      Locals.config().dbName,
      Locals.config().dbUser,
      Locals.config().dbPassword,
      {
        dialect: 'mysql',
        host: 'localhost',
        logging: false
      }
    );
  }

  public async init() {
    try {
      await this.sequelize.sync();
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Database();
