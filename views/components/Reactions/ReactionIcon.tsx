import React from 'react';
import { ISetStateLoading } from '../../interfaces/FormData';
import GV from '../../util/constValues';

type TReactionIcon = {
  emoji: { name: string; number: number };
  numberOfReactions: number;
  memeId: number;
  setStateForLoading: ISetStateLoading;
  isButtonActive: boolean;
  chosenType: number;
};

const ReactionIcon: React.FC<TReactionIcon> = (props) => {
  const reactButtonHandler = async () => {
    if (!props.isButtonActive) {
      return;
    }
    props.setStateForLoading(true);
    try {
      await fetch(GV.URLS.API_POST + '/add-reaction', {
        method: 'POST',
        credentials: 'include',
        body: JSON.stringify({
          type: props.emoji.number,
          memeId: props.memeId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      props.setStateForLoading(false);
    }
  };

  const dimClass = props.numberOfReactions === 0 ? ' dimItem' : '';
  const isActiveClass = props.isButtonActive ? ' active' : ' inactive';
  const isChosenTypeClass = props.chosenType === props.emoji.number ? ' isChosen' : '';

  return (
    <span className={'reactionIcon' + dimClass}>
      <img
        src={'/images/cheese-emojis/emoji-' + props.emoji.name + '.png'}
        alt={props.emoji.name}
        onClick={reactButtonHandler}
        className={isActiveClass}
      />
      <b className={isChosenTypeClass}>{props.numberOfReactions}</b>
    </span>
  );
};

export default ReactionIcon;
