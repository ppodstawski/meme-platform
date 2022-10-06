import { NextPage } from 'next';
import React, { Fragment } from 'react';
import AdminNav from '../views/components/Admin/AdminNav';
import MyMemes from '../views/components/Admin/MyMemes/MyMemes';

const AdminPage: NextPage = () => {
  return (
    <Fragment>
      <AdminNav />
      <MyMemes />
    </Fragment>
  );
};

export default AdminPage;
