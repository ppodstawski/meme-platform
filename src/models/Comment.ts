/**
 * Comment model definition
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import { DataTypes, InferAttributes, InferCreationAttributes, CreationOptional, ForeignKey, Model } from 'sequelize';

import Database from '../providers/Database';
import Meme from './Meme';
import User from './User';

export class Comment extends Model<InferAttributes<Comment>, InferCreationAttributes<Comment>> {
  declare id: CreationOptional<number>;
  declare message: string;
  declare UserId: ForeignKey<User['id']>;
  declare MemeId: ForeignKey<Meme['id']>;
}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    message: {
      type: DataTypes.STRING(1024),
      allowNull: false
    }
  },
  {
    tableName: 'comments',
    sequelize: Database.sequelize
  }
);

export default Comment;
