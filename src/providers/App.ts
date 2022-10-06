/**
 * Primary FIRE file
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import express from 'express';

import Locals from './Locals';
import Associations from '../models/Associations';
import Database from './Database';
import nextApp from './NextJS';
import Express from './Express';

class App {
  public async start(): Promise<void> {
    /**
     * Global app express object - maybe move later to providers/Express
     */
    const app: express.Application = express();

    /**
     * Load dotEnv config
     */
    Locals.init(app);

    /**
     * Gather model associations
     */
    Associations.init();

    /**
     * Initiate the database connection
     */
    await Database.init();

    /**
     * Start the Express & nextJS server
     */
    await nextApp.prepare();
    await Express.init(app);
  }
}

export default new App();
