import React from 'react';
import classes from './ReactionSumStar.module.scss';

const ReactionSumStar: React.FC<{ reactions: any }> = (props) => {
  const calculateAllReactions = () => {
    const reactionsByType = props.reactions.map((reactionType) => reactionType.Users);
    return reactionsByType.flat().length;
  };

  return (
    <span className={classes.reactionSumStar}>
      <b>{calculateAllReactions()}</b>
      <img src={'/images/star.png'} alt={'Star for number of reactions'} />
    </span>
  );
};

export default ReactionSumStar;
