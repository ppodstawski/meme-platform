import React from 'react';
import { dateFormat } from '../../util/dateFormat';
import ReactionPanel from '../Reactions/ReactionPanel';
import ReactionSumStar from '../Reactions/ReactionSumStar';

export type TFeedItemContent = {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  User: { username: string; profileImage: string };
  createdAt: string;
  reactions: any;
  showReactionButtons: boolean;
};

const FeedItemContent: React.FC<TFeedItemContent> = (props) => {
  const feedItemCreatedAt = dateFormat(props.createdAt);

  return (
    <article className="feedItemContent">
      <header>
        <h3>{props.title}</h3>
        <p>
          by: <i>{props.User.username}</i>, at: <time>{feedItemCreatedAt}</time>
        </p>
      </header>
      <section>{props.description}</section>
      <figure>
        <ReactionSumStar reactions={props.reactions} />
        <img src={props.imageUrl} alt={props.title} />
      </figure>
      <ReactionPanel reactions={props.reactions} memeId={props.id} showReactionButtons={props.showReactionButtons} />
    </article>
  );
};

export default FeedItemContent;
