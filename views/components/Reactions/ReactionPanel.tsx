import React, { Fragment, useEffect, useState } from 'react';
import { useAuthContext } from '../../store/auth-context';
import GV, { Emojis } from '../../util/constValues';
import IconSVG from '../Common/IconSVG';
import ReactionIcon from './ReactionIcon';
import classes from './ReactionPanel.module.scss';

export type TReactionPanel = {
  memeId: number;
  reactions: any;
  showReactionButtons: boolean;
};

const ReactionPanel: React.FC<TReactionPanel> = (props) => {
  const authCtx = useAuthContext();
  const loggedUserId = authCtx.user.userId;
  const isLoggedIn = authCtx.isLoggedIn;
  const [isLoading, setIsLoading] = useState(false);
  const [hasUserReacted, setHasUserReacted] = useState(false);
  const [chosenType, setChosenType] = useState(0);
  const showButtons = props.showReactionButtons;

  const reactRemoveButtonHandler = async () => {
    setIsLoading(true);
    try {
      await fetch(GV.URLS.API_POST + '/remove-reaction', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({
          memeId: props.memeId
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const checkIfUserReacted = () => {
    let switchHasReacted = false;
    let chosen = 0;
    props.reactions.forEach((reactionType) => {
      const hasReacted = reactionType.Users.find((user) => user.id === loggedUserId);
      if (!!hasReacted) {
        chosen = reactionType.type;
        switchHasReacted = true;
      }
    });
    setChosenType(chosen);
    setHasUserReacted(switchHasReacted);
  };

  useEffect(() => {
    checkIfUserReacted();
  }, [checkIfUserReacted]);

  const calculateReactionsByType = (type) => {
    const reactionByType = props.reactions.find((reaction) => reaction.type === type);
    if (!!reactionByType) {
      return reactionByType.Users.flat().length;
    }
    return 0;
  };

  return (
    <div className={classes.reactionPanel}>
      {showButtons &&
        (hasUserReacted ? (
          <Fragment>
            <button className="reactBtn remove" onClick={reactRemoveButtonHandler}>
              Remove reaction
            </button>
            <span className="reactInfo">You reacted already!</span>
          </Fragment>
        ) : isLoggedIn ? (
          <button className="reactBtn inactive" disabled={true}>
            Here you can react <IconSVG src="right-arrow-alt" alt="Arrow right" />
          </button>
        ) : (
          <button className="reactBtn inactive" disabled={true}>
            Need to login to react!
          </button>
        ))}
      {isLoading && <span>Loading reactions...</span>}
      {!isLoading && (
        <span>
          {Emojis.map((emoji) => (
            <ReactionIcon
              emoji={emoji}
              numberOfReactions={calculateReactionsByType(emoji.number)}
              setStateForLoading={setIsLoading}
              memeId={props.memeId}
              isButtonActive={showButtons && isLoggedIn && !hasUserReacted}
              chosenType={chosenType}
            />
          ))}
        </span>
      )}
    </div>
  );
};

export default ReactionPanel;
