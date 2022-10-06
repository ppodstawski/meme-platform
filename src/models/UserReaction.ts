/**
 * Reaction and User Many-to-Many through table association
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { InferAttributes, InferCreationAttributes, Model } from 'sequelize';

import Database from '../providers/Database';

export class UserReaction extends Model<InferAttributes<UserReaction>, InferCreationAttributes<UserReaction>> {}

UserReaction.init({}, { sequelize: Database.sequelize, timestamps: false });

export default UserReaction;
