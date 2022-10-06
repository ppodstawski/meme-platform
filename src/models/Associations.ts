/**
 * Associations gathered in one class
 *
 * @author Piotr Podstawski <podstawski.p@gmail.com>
 */

import User from './User';
import Meme from './Meme';
import Comment from './Comment';
import Reaction from './Reaction';
import UserReaction from './UserReaction';

class Associations {
  public static init() {
    User.hasMany(Meme, {
      sourceKey: 'id',
      as: 'memes'
    });

    User.hasMany(Comment, {
      sourceKey: 'id',
      as: 'comments'
    });

    User.belongsToMany(Reaction, {
      through: UserReaction,
      constraints: true,
      onDelete: 'CASCADE'
    });

    Meme.belongsTo(User, {
      targetKey: 'id',
      constraints: true,
      onDelete: 'CASCADE'
    });

    Meme.hasMany(Comment, {
      sourceKey: 'id',
      as: 'comments'
    });

    Meme.hasMany(Reaction, {
      sourceKey: 'id',
      as: 'reactions'
    });

    Comment.belongsTo(Meme, {
      targetKey: 'id',
      constraints: true,
      onDelete: 'CASCADE'
    });

    Comment.belongsTo(User, {
      targetKey: 'id',
      constraints: true,
      onDelete: 'CASCADE'
    });

    Reaction.belongsTo(Meme, {
      targetKey: 'id',
      constraints: true,
      onDelete: 'CASCADE'
    });

    Reaction.belongsToMany(User, {
      through: UserReaction,
      constraints: true,
      onDelete: 'CASCADE'
    });
  }
}

export default Associations;
