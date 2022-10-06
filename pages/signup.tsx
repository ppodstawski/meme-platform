import { NextPage } from 'next';
import React, { Fragment } from 'react';
import RegisterForm from '../views/components/Auth/RegisterForm';
import { TAuthFormProps } from '../views/types/authForm';

const SignupPage: NextPage<TAuthFormProps> = ({ csrfToken }) => {
  return (
    <Fragment>
      <RegisterForm csrfToken={csrfToken} />
    </Fragment>
  );
};

export const getServerSideProps = async ({ res }) => {
  const csrfToken = res.locals.csrfToken;
  return { props: { csrfToken } };
};

export default SignupPage;
