import Head from 'next/head';
import React, { Fragment } from 'react';
import { NextPage } from 'next';
import Feed from '../views/components/Feed/Feed';

const IndexPage: NextPage = () => {
  return (
    <Fragment>
      <Head>
        <title>Meme Platform</title>
        <meta name="description" content="Meme Platform" />
      </Head>
      <Feed />
    </Fragment>
  );
};

export default IndexPage;
