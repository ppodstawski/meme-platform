import React from 'react';

import classes from './FlashMessage.module.scss';
import { TStatusMessage } from '../../types/statusMessage';

const FlashMessage: React.FC<TStatusMessage> = (props) => {
  return (
    <div className={classes.flashMessage}>
      <span className={'messageText ' + props.result + 'Msg'}>{props.message}</span>
    </div>
  );
};

export default FlashMessage;
