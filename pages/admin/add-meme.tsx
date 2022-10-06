import { NextPage } from 'next';
import React, { Fragment } from 'react';
import AdminNav from '../../views/components/Admin/AdminNav';
import EditMeme from '../../views/components/Admin/EditMeme';

const AddMemePage: NextPage = () => {
  return (
    <Fragment>
      <AdminNav />
      <EditMeme mode="NEW" />
    </Fragment>
  );
};

export default AddMemePage;
