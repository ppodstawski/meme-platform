/**
 * Meme model definition
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  CreationOptional,
  Model,
  NonAttribute,
  HasManyCreateAssociationMixin,
  HasManyGetAssociationsMixin,
  Association,
  ForeignKey,
  HasManyAddAssociationMixin,
  BelongsToManyAddAssociationMixin,
  BelongsToManyCreateAssociationMixin
} from 'sequelize';

import Database from '../providers/Database';
import Comment from './Comment';
import Reaction from './Reaction';
import User from './User';

export class Meme extends Model<InferAttributes<Meme>, InferCreationAttributes<Meme>> {
  declare id: CreationOptional<number>;
  declare title: string;
  declare imageUrl: string;
  declare description: string;
  declare createComment: HasManyCreateAssociationMixin<Comment>;
  declare getComment: HasManyGetAssociationsMixin<Comment[]>;
  declare comments?: NonAttribute<Comment[]>;
  declare reactions?: NonAttribute<Reaction[]>;
  declare UserId: ForeignKey<User['id']>;

  declare static associations: {
    comments: Association<Meme, Comment>;
    reactions: Association<Meme, Reaction>;
  };
}

Meme.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true
    },
    title: DataTypes.STRING,
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    tableName: 'memes',
    sequelize: Database.sequelize
  }
);

export default Meme;
