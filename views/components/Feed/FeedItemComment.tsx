import React, { Fragment, useEffect, useState } from 'react';
import { TStatusMessage } from '../../types/statusMessage';
import GV from '../../util/constValues';
import UserProfilePicture from '../Common/UserProfilePicture';
import FlashMessage from '../Form/FlashMessage';
import FeedItemCommentForm from './FeedItemCommentForm';

export type TFeedItemComment = {
  id: number;
  memeId: number;
  message: string;
  creator: { username: string; profileImage: string };
  creationDate: string;
  removeHandler?: (itemId: number) => void;
  showControls: boolean;
  hideProfilePicture?: boolean;
};

const FeedItemComment: React.FC<TFeedItemComment> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState(props.message);
  const [formMessage, setFormMessage] = useState<TStatusMessage>({ result: '', message: '' });

  const deleteHandler = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(GV.URLS.API_POST + '/delete-comment', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({
          commentId: props.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseJSON = await response.json();

      if (responseJSON.ok && props.removeHandler) {
        props.removeHandler(props.id);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const editHandler = () => {
    setEditMode((previousState) => !previousState);
  };

  const onUpdateMessage = (newMessage) => {
    setMessage(newMessage);
    setEditMode(false);
  };

  useEffect(() => {
    setMessage(props.message);
  }, [props.message]);

  const showControlsClass = props.showControls ? ' controls' : '';
  const hideProfilePictureClass = props.hideProfilePicture ? ' hideProfilePicture' : '';

  return (
    <Fragment>
      {isLoading && <div>Loading...</div>}

      <div className={'commentField' + showControlsClass + hideProfilePictureClass}>
        {!isLoading && !editMode && (
          <Fragment>
            <p>
              {!props.hideProfilePicture && (
                <UserProfilePicture src={props.creator.profileImage} alt={props.creator.username} place="COMMENTS" />
              )}
              <b>{props.creator.username}:</b> {message}
            </p>
            <time>{props.creationDate}</time>
          </Fragment>
        )}
        {!isLoading && editMode && (
          <FeedItemCommentForm
            messageStateHandler={setFormMessage}
            loadingStateHandler={setIsLoading}
            memeId={props.memeId}
            commentId={props.id}
            action={'UPDATE'}
            filledMessage={message}
            onUpdateHandler={onUpdateMessage}
          />
        )}
        {editMode && formMessage.message && <FlashMessage result={formMessage.result} message={formMessage.message} />}
        {props.showControls && (
          <div className="commentControls">
            <button onClick={editHandler} className={editMode ? 'actionButton editing' : 'actionButton'}>
              {editMode ? 'Stop editing' : 'Edit'}
            </button>
            <button onClick={deleteHandler} className="actionButton">
              Delete
            </button>
          </div>
        )}
      </div>
    </Fragment>
  );
};

export default FeedItemComment;
