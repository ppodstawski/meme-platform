/**
 * Reaction model definition
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  ForeignKey,
  Model,
  BelongsToManyGetAssociationsMixin
} from 'sequelize';

import Database from '../providers/Database';
import Meme from './Meme';
import User from './User';

export class Reaction extends Model<InferAttributes<Reaction>, InferCreationAttributes<Reaction>> {
  declare id: CreationOptional<number>;
  declare type: number;
  declare getUsers: BelongsToManyGetAssociationsMixin<User>;
  declare UserId: ForeignKey<User['id']>;
  declare MemeId: ForeignKey<Meme['id']>;
}

Reaction.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    type: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize: Database.sequelize,
    tableName: 'reactions',
    timestamps: false
  }
);

export default Reaction;
