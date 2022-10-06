import React, { Fragment, PropsWithChildren } from 'react';
import Footer from './Footer';

import MainNavigation from './MainNavigation';

const Layout: React.FC<PropsWithChildren> = (props) => {
  return (
    <Fragment>
      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </Fragment>
  );
};

export default Layout;
