import React from 'react';
import { useAuthContext } from '../../store/auth-context';
import { useRouter } from 'next/router';
import Link from 'next/link';

import classes from './MainNavigation.module.scss';
import GV from '../../util/constValues';
import { NavLink } from './NavLink';
import UserProfilePicture from '../Common/UserProfilePicture';
import IconSVG from '../Common/IconSVG';

const MainNavigation = () => {
  const authCtx = useAuthContext();
  const router = useRouter();

  const isLoggedIn = authCtx.isLoggedIn;
  const user = authCtx.user;

  const logoutHandler = async () => {
    try {
      const response = await fetch(GV.URLS.API_POST + GV.URLS.LOGOUT, {
        method: 'POST',
        credentials: 'include'
      });

      const responseJSON = await response.json();
      if (responseJSON.ok) {
        authCtx.logout();
        router.push('/');
      } else {
        console.log({ status: 'error', message: 'Encountered server error while trying to logout.' });
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <header className={classes.header}>
      <h1 className={classes.logo}>
        <Link href="/">
          <img src="/images/kitty_white_rotated.png" alt="Meme Platform Logo" />
        </Link>
      </h1>
      <nav>
        {isLoggedIn ? (
          <p className={classes.userInfo}>
            <UserProfilePicture src={user.profileImage} alt={user.username} place="MAIN_MENU" /> Hi! {user.username}!
          </p>
        ) : (
          <p className={classes.userInfo}>
            <UserProfilePicture src={'images/unknown.jpg'} alt={'Not logged in'} place="MAIN_MENU" />
            You are not logged in
          </p>
        )}
        <ul>
          <li>
            <NavLink href="/">
              <a className="navButton">
                <IconSVG src="home" alt="Feed" />
                Feed
              </a>
            </NavLink>
          </li>
          {!isLoggedIn && (
            <li>
              <NavLink href="/login">
                <a className="navButton">
                  <IconSVG src="user" alt="Login" />
                  Login
                </a>
              </NavLink>
            </li>
          )}
          {!isLoggedIn && (
            <li>
              <NavLink href="/signup" shallow={false}>
                <a className="navButton">
                  <IconSVG src="user-plus" alt="Signup" />
                  Signup
                </a>
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink href="/admin" hasSubcategories={true}>
                <a className="navButton">
                  <IconSVG src="edit" alt="Manage memes" />
                  Manage memes
                </a>
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <NavLink href="/profile" shallow={false}>
                <a className="navButton">
                  <IconSVG src="user-detail" alt="Profile" />
                  Profile
                </a>
              </NavLink>
            </li>
          )}
          {isLoggedIn && (
            <li>
              <button className="navButton" onClick={logoutHandler}>
                <IconSVG src="user-minus" alt="Logout" />
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
