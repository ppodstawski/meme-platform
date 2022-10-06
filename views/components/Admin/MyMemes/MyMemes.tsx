import React, { Fragment, PropsWithChildren, useCallback, useEffect, useState } from 'react';

import GV from '../../../util/constValues';
import classes from '../../Feed/Feed.module.scss';
import FlashMessage from '../../Form/FlashMessage';
import AdminMemeItem, { TAdminMemeItem } from './AdminMemeItem';

const MyMemes: React.FC = (props: PropsWithChildren) => {
  const [feedItems, setFeedItems] = useState<TAdminMemeItem[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const getFeed = useCallback(async () => {
    setIsLoading(true);
    try {
      const response = await fetch(GV.URLS.API_POST + '/get-my-memes', {
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

  const onRemove = (itemId: number) => {
    setFeedItems((previousState) => previousState.filter((feedItem) => feedItem.id !== itemId));
  };

  const showItems = () => {
    return feedItems.map((feedItem) => {
      return (
        <li key={feedItem.id} className={classes.feedItem}>
          <AdminMemeItem {...feedItem} removeHandler={onRemove} />
        </li>
      );
    });
  };

  useEffect(() => {
    getFeed();
  }, [getFeed]);

  return (
    <Fragment>
      {isLoading && <p>Loading memes...</p>}
      {!isLoading && (
        <section className="commonCard">
          {feedItems.length > 0 ? (
            <ul>{showItems()}</ul>
          ) : (
            <FlashMessage result="error" message="No memes found! Maybe you want to add one?" />
          )}
        </section>
      )}
    </Fragment>
  );
};

export default MyMemes;
