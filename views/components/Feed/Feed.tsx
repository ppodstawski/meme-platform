import React, { FormEvent, Fragment, PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import openSocket from 'socket.io-client';

import GV from '../../util/constValues';
import classes from './Feed.module.scss';
import FeedItem, { TFeedItem } from './FeedItem';

const Feed: React.FC = (props: PropsWithChildren) => {
  const [feedItems, setFeedItems] = useState<TFeedItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFeed = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GV.URLS.API_POST + '/get-feed', {
        method: 'GET',
        credentials: 'include'
      });

      const responseJSON = await response.json();
      if (responseJSON.ok) {
        setFeedItems((previousState) => {
          return [...previousState, ...responseJSON.body];
        });
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    getFeed();
    const socket = openSocket(GV.URLS.APP);

    socket.on('comments', (data) => {
      if (data.action === 'add-comment') {
        setFeedItems((previousState) => {
          const newState = Array.from(previousState);
          const memeIdToFind = data.comment.MemeId;
          const feedItemToUpdate = newState.find((item) => item.id === memeIdToFind);

          if (feedItemToUpdate) {
            feedItemToUpdate.comments.push(data.comment);
            return newState;
          }
          return previousState;
        });
      } else if (data.action === 'update-comment') {
        setFeedItems((previousState) => {
          const newState = Array.from(previousState);
          const memeIdToFind = data.comment.MemeId;
          const feedItemToUpdate = newState.find((item) => item.id === memeIdToFind);

          if (feedItemToUpdate) {
            const indexToSplice = feedItemToUpdate.comments.findIndex((comment) => comment.id === data.comment.id);
            const newComment = {
              ...feedItemToUpdate.comments[indexToSplice],
              message: data.comment.message
            };
            feedItemToUpdate.comments.splice(indexToSplice, 1, newComment);
            return newState;
          }
          return previousState;
        });
      } else if (data.action === 'delete-comment') {
        setFeedItems((previousState) => {
          const newState = Array.from(previousState);
          const memeIdToFind = data.comment.MemeId;
          const feedItemToUpdate = newState.find((item) => item.id === memeIdToFind);

          if (feedItemToUpdate) {
            const indexToSplice = feedItemToUpdate.comments.findIndex((comment) => comment.id === data.comment.id);
            feedItemToUpdate.comments.splice(indexToSplice, 1);
            return newState;
          }
          return previousState;
        });
      }
    });

    socket.on('reactions', (data) => {
      if (data.action === 'add-reaction') {
        setFeedItems((previousState) => {
          const newState = Array.from(previousState);
          const memeIdToFind = data.reaction.memeId;
          const feedItemToUpdate = newState.find((item) => item.id === memeIdToFind);

          if (feedItemToUpdate) {
            const indexToUpdate = feedItemToUpdate.reactions.findIndex(
              (reaction) => reaction.type === data.reaction.type
            );

            if (indexToUpdate !== -1) {
              feedItemToUpdate.reactions[indexToUpdate].Users.push({ id: data.user.id, username: data.user.username });
            } else {
              feedItemToUpdate.reactions.push({
                id: data.reaction.id,
                type: data.reaction.type,
                MemeId: data.reaction.memeId,
                Users: [{ id: data.user.id, username: data.user.username }]
              });
            }
            return newState;
          }
          return previousState;
        });
      }
      if (data.action === 'remove-reaction') {
        setFeedItems((previousState) => {
          const newState = Array.from(previousState);
          const memeIdToFind = data.reaction.memeId;
          const feedItemToUpdate = newState.find((item) => item.id === memeIdToFind);

          if (feedItemToUpdate) {
            feedItemToUpdate.reactions.forEach((reactionType) => {
              const reactionToDeleteIndex = reactionType.Users.findIndex((user) => user.id === data.user.id);
              if (reactionToDeleteIndex !== -1) {
                reactionType.Users.splice(reactionToDeleteIndex, 1);
              }
            });
            return newState;
          }
          return previousState;
        });
      }
    });
  }, [getFeed]);

  return (
    <Fragment>
      {isLoading && <p>Loading memes...</p>}
      {!isLoading && (
        <section>
          {feedItems.length > 0 ? (
            <ul>
              {feedItems.map((feedItem) => {
                return (
                  <li key={feedItem.id} className={classes.feedItem + ' commonCard'}>
                    <FeedItem {...feedItem} />
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="commonCard">Ups! We got error! No memes found!</div>
          )}
        </section>
      )}
    </Fragment>
  );
};

export default Feed;
