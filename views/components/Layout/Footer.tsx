import React from 'react';
import classes from './Footer.module.scss';

const Footer: React.FC = (props) => {
  return (
    <footer className={classes.mainFooter}>
      <ul>
        <li>
          <a className="navButton" href="/privacy-policy">
            Privacy Policy
          </a>
        </li>
        <li>
          <a className="navButton" href="/about">
            About
          </a>
        </li>
      </ul>
      <div className={classes.copyrights}>
        Copyright © <a href="#github">Piotr Podstawski</a> 2022
      </div>
    </footer>
  );
};

export default Footer;
