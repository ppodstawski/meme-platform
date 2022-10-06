import router from 'next/router';
import React, { Fragment, useState } from 'react';
import { TStatusMessage } from '../../../types/statusMessage';
import GV from '../../../util/constValues';
import FeedItemContent from '../../Feed/FeedItemContent';
import FlashMessage from '../../Form/FlashMessage';
import classes from './AdminMemeItem.module.scss';

export type TAdminMemeItem = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  reactions: any;
  createdAt: string;
  removeHandler: (itemId: number) => void;
};

const AdminMemeItem: React.FC<TAdminMemeItem> = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<TStatusMessage>({ result: '', message: '' });

  const deleteHandler = async () => {
    setIsLoading(true);

    try {
      const response = await fetch(GV.URLS.API_POST + '/delete-meme', {
        method: 'DELETE',
        credentials: 'include',
        body: JSON.stringify({
          memeId: props.id
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      const responseJSON = await response.json();
      setStatusMessage(responseJSON.flash);
      if (responseJSON.ok) {
        props.removeHandler(props.id);
      }
    } catch (error: any) {
      console.log(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Fragment>
      <div className={classes.adminActions}>
        <a href={'/admin/edit-meme/' + props.id} className="actionButton">
          Edit
        </a>
        <button onClick={deleteHandler} className="actionButton">
          Delete
        </button>
      </div>
      {statusMessage.message && <FlashMessage result={statusMessage.result} message={statusMessage.message} />}
      {!isLoading && (
        <FeedItemContent
          {...props}
          User={{
            username: 'You',
            profileImage: 'images/no_profile_picture.png'
          }}
          showReactionButtons={false}
        />
      )}
    </Fragment>
  );
};

export default AdminMemeItem;
