import { NextPage } from 'next';
import React, { Fragment } from 'react';
import AdminNav from '../../views/components/Admin/AdminNav';
import MyComments from '../../views/components/Admin/MyComments/MyComments';

const AdminCommentsPage: NextPage = () => {
  return (
    <Fragment>
      <AdminNav />
      <MyComments />
    </Fragment>
  );
};

export default AdminCommentsPage;
