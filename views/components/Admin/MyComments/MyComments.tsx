import React, { Fragment, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { TComment } from '../../../types/comment';

import GV from '../../../util/constValues';
import { dateFormat } from '../../../util/dateFormat';
import FeedItemComment from '../../Feed/FeedItemComment';
import FlashMessage from '../../Form/FlashMessage';

const MyComments: React.FC = (props: PropsWithChildren) => {
  const [comments, setComments] = useState<TComment[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getComments = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GV.URLS.API_POST + '/get-my-comments', {
        method: 'GET',
        credentials: 'include'
      });

      const responseJSON = await response.json();
      if (responseJSON.ok) {
        setComments((previousState) => {
          return [...previousState, ...responseJSON.body];
        });
      }
    } catch (error) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const onRemove = (itemId: number) => {
    setComments((previousState) => {
      const newState = Array.from(previousState);
      const indexToSplice = newState.findIndex((comment) => comment.id === itemId);
      newState.splice(indexToSplice, 1);

      return newState;
    });
  };

  const showItems = () => {
    return comments.map((comment) => {
      const creator = {
        username: 'You',
        profileImage: 'images/no_profile_picture.png'
      };
      const creationDate = dateFormat(comment.createdAt);
      return (
        <FeedItemComment
          key={comment.id}
          id={comment.id}
          memeId={comment.memeId}
          creator={creator}
          message={comment.message}
          creationDate={creationDate}
          removeHandler={onRemove}
          showControls={true}
          hideProfilePicture={true}
        />
      );
    });
  };

  useEffect(() => {
    getComments();
  }, [getComments]);

  return (
    <Fragment>
      {isLoading && <p>Loading comments...</p>}
      {!isLoading && (
        <section className="commonCard">
          {comments.length > 0 ? showItems() : <FlashMessage result="error" message="No comments found!" />}
        </section>
      )}
    </Fragment>
  );
};

export default MyComments;
