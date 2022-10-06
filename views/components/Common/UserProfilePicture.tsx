import React from 'react';

const UserProfilePicture: React.FC<{ src: string; alt: string; place: string }> = (props) => {
  let additionalClasses = '';
  if (props.place === 'MAIN_MENU') {
    additionalClasses += ' mainMenu';
  }
  if (props.place === 'COMMENTS') {
    additionalClasses += ' comments';
  }
  return (
    <span className={'userProfilePicture' + additionalClasses}>
      <img src={'/' + props.src} alt={props.alt} />
    </span>
  );
};

export default UserProfilePicture;
