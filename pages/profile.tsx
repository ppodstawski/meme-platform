import { NextPage } from 'next';
import React, { Fragment } from 'react';
import EditProfile from '../views/components/Profile/EditProfile';

const ProfilePage: NextPage = () => {
  return (
    <Fragment>
      <EditProfile />
    </Fragment>
  );
};

export default ProfilePage;
