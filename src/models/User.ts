/**
 * User model definition
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Association,
  NonAttribute,
  CreationOptional,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyRemoveAssociationMixin
} from 'sequelize';

import Database from '../providers/Database';
import Meme from './Meme';
import Comment from './Comment';
import Reaction from './Reaction';

export class User extends Model<
  InferAttributes<User, { omit: 'memes' }>,
  InferCreationAttributes<User, { omit: 'memes' }>
> {
  declare id: CreationOptional<number>;
  declare email: string;
  declare username: string;
  declare password: string;
  declare description: string;
  declare profileImage: string;
  declare createMeme: HasManyCreateAssociationMixin<Meme>;
  declare getMemes: HasManyGetAssociationsMixin<Meme[]>;
  declare memes?: NonAttribute<Meme[]>;
  declare reactions?: NonAttribute<Reaction[]>;
  declare createReaction: BelongsToManyCreateAssociationMixin<Reaction>;
  declare getReactions: BelongsToManyGetAssociationsMixin<Reaction>;
  declare addReaction: BelongsToManyAddAssociationMixin<Reaction, User>;
  declare removeReaction: BelongsToManyRemoveAssociationMixin<Reaction, User>;

  declare static associations: {
    memes: Association<User, Meme>;
    comments: Association<User, Comment>;
    reactions: Association<User, Reaction>;
  };
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    description: {
      type: DataTypes.STRING(1024),
      defaultValue: ''
    },
    profileImage: {
      type: DataTypes.STRING,
      defaultValue: 'images/no_profile_picture.png'
    }
  },
  {
    tableName: 'users',
    sequelize: Database.sequelize
  }
);

export default User;
