import React, { Dispatch, FormEvent, Fragment, SetStateAction, useEffect, useRef, useState } from 'react';
import { TStatusMessage } from '../../types/statusMessage';
import GV from '../../util/constValues';

type TCommentForm = {
  memeId: number;
  action: string;
  loadingStateHandler: Dispatch<SetStateAction<boolean>>;
  messageStateHandler: Dispatch<SetStateAction<TStatusMessage>>;
  commentId?: number;
  filledMessage?: string;
  onUpdateHandler?: (message: string) => void;
};

const FeedItemCommentForm: React.FC<TCommentForm> = (props) => {
  const feedItemIdRef = useRef() as React.MutableRefObject<HTMLInputElement>;

  const [message, setMessage] = useState(props.filledMessage ? props.filledMessage : '');

  const commentHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.length > 0) {
      props.loadingStateHandler(true);
      try {
        let url = GV.URLS.API_POST + '/post-comment';
        let method = 'POST';

        if (props.action === 'UPDATE') {
          url = GV.URLS.API_POST + '/update-comment';
          method = 'PATCH';
        }

        const commentData = {
          memeId: props.memeId,
          message
        };

        if (props.commentId) {
          // @ts-ignore
          commentData.commentId = props.commentId;
        }

        const response = await fetch(url, {
          method,
          credentials: 'include',
          body: JSON.stringify({
            ...commentData
          }),
          headers: {
            'Content-Type': 'application/json'
          }
        });

        const responseJSON = await response.json();
        if (!responseJSON.ok && responseJSON.flash) {
          props.messageStateHandler(responseJSON.flash);
        }
        if (responseJSON.ok && props.onUpdateHandler) {
          props.onUpdateHandler(message);
        }
      } catch (error: any) {
        console.log(error.message);
      } finally {
        props.loadingStateHandler(false);
      }
    } else {
      props.messageStateHandler({ result: 'error', message: 'Please provide some message if you want to comment.' });
    }
  };

  const onUpdateMessage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };

  return (
    <Fragment>
      <div className="comments">
        <form onSubmit={commentHandler}>
          <input type="hidden" ref={feedItemIdRef} value={props.memeId} />
          <input type="text" onChange={onUpdateMessage} placeholder="Type your comment here" value={message} />
          <button>Submit comment</button>
        </form>
      </div>
    </Fragment>
  );
};

export default FeedItemCommentForm;
