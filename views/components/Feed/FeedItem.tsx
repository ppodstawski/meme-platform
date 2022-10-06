import React, { FormEvent, Fragment, useRef, useState } from 'react';
import { TStatusMessage } from '../../types/statusMessage';
import FlashMessage from '../Form/FlashMessage';
import classes from './Feed.module.scss';
import { useAuthContext } from '../../store/auth-context';
import { dateFormat } from '../../util/dateFormat';
import FeedItemContent from './FeedItemContent';
import FeedItemComment from './FeedItemComment';
import { TComment } from '../../types/comment';
import FeedItemCommentForm from './FeedItemCommentForm';

export type TFeedItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  comments: TComment[];
  User: { username: string; profileImage: string };
  reactions: any;
  createdAt: string;
};

const FeedItem: React.FC<TFeedItem> = (props) => {
  const authCtx = useAuthContext();

  const isLoggedIn = authCtx.isLoggedIn;
  const [isLoading, setIsLoading] = useState(false);
  const [formMessage, setFormMessage] = useState<TStatusMessage>({ result: '', message: '' });

  let showComments;
  if (props.comments) {
    const sortedComments = props.comments.sort(function (a, b) {
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
    showComments = sortedComments.map((comment) => {
      if (comment) {
        const creator = {
          username: comment.User ? comment.User.username : 'Undefined user',
          profileImage: comment.User.profileImage
        };
        const creationDate = dateFormat(comment.createdAt);
        return (
          <FeedItemComment
            key={comment.id}
            id={comment.id}
            memeId={props.id}
            creator={creator}
            message={comment.message}
            creationDate={creationDate}
            showControls={false}
          />
        );
      }
    });
  } else {
    showComments = <span>No comments found</span>;
  }

  return (
    <Fragment>
      <FeedItemContent {...props} showReactionButtons={true} />
      <section>{showComments}</section>
      {isLoading && <p>Loading comments...</p>}
      {!isLoading && isLoggedIn && (
        <FeedItemCommentForm
          messageStateHandler={setFormMessage}
          loadingStateHandler={setIsLoading}
          memeId={props.id}
          action={'POST'}
        />
      )}
      {!isLoggedIn && <p className={classes.commentsLoginInfo}>You must log in to comment!</p>}
      {formMessage.message && <FlashMessage result={formMessage.result} message={formMessage.message} />}
    </Fragment>
  );
};

export default FeedItem;
