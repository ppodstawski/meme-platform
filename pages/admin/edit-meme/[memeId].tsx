import { NextPage } from 'next';
import React, { Fragment } from 'react';
import AdminNav from '../../../views/components/Admin/AdminNav';
import EditMeme from '../../../views/components/Admin/EditMeme';

const EditMemePage: NextPage = () => {
  return (
    <Fragment>
      <AdminNav />
      <EditMeme mode="EDIT" />
    </Fragment>
  );
};

export default EditMemePage;
