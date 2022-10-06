import { NextPage } from 'next';
import React, { Fragment } from 'react';
import LoginForm from '../views/components/Auth/LoginForm';
import { TAuthFormProps } from '../views/types/authForm';

const LoginPage: NextPage<TAuthFormProps> = ({ csrfToken }) => {
  return (
    <Fragment>
      <LoginForm csrfToken={csrfToken} />
    </Fragment>
  );
};

export const getServerSideProps = async ({ res }) => {
  const csrfToken = res.locals.csrfToken;
  return { props: { csrfToken } };
};

export default LoginPage;
