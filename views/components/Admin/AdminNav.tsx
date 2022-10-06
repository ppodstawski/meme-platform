import React, { PropsWithChildren } from 'react';
import { NavLink } from '../Layout/NavLink';
import classes from './AdminNav.module.scss';

const AdminNav: React.FC = () => {
  return (
    <nav className={classes.adminNav}>
      <ul>
        <li>
          <NavLink href="/admin">
            <a className="navButton">My memes</a>
          </NavLink>
        </li>
        <li>
          <NavLink href="/admin/add-meme">
            <a className="navButton">Add new meme</a>
          </NavLink>
        </li>
        <li>
          <NavLink href="/admin/comments">
            <a className="navButton">My comments</a>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNav;
