import React, { useContext, useState, useEffect, useCallback, PropsWithChildren, Context, Provider } from 'react';
import { useRouter } from 'next/router';
import GV from '../util/constValues';

let logoutTimer: ReturnType<typeof setTimeout>;

export type TCtxUser = { userId: number; email: string; username: string; profileImage: string };

export type TAuthContext = {
  token: any;
  isLoggedIn: boolean;
  user: TCtxUser;
  login(token: string, expirationTime: string, user: TCtxUser): void;
  logout(): void;
};

export const AuthContext = React.createContext<TAuthContext>({
  token: '',
  isLoggedIn: false,
  user: { userId: 0, email: '', username: '', profileImage: 'images/no_profile_picture.png' },
  login: (token: string, expirationTime: string): void => {},
  logout: () => {}
});

const calculateRemainingTime = (expirationTime: string) => {
  const currentTime = new Date().getTime();
  const adjExpirationTime = new Date(expirationTime).getTime();

  const remainingDuration = adjExpirationTime - currentTime;

  return remainingDuration;
};

const retrieveStoredToken = () => {
  if (typeof window !== 'undefined') {
    const storedToken = localStorage.getItem('token');
    const storedExpirationDate = localStorage.getItem('expirationTime');
    let remainingTime = 0;

    if (storedExpirationDate) {
      remainingTime = calculateRemainingTime(storedExpirationDate);
    }

    if (remainingTime <= 3600) {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      return null;
    }

    return {
      token: storedToken,
      duration: remainingTime
    };
  }
};

const AuthContextProvider: React.FC<PropsWithChildren> = (props) => {
  const router = useRouter();

  const tokenData = retrieveStoredToken();

  const [token, setToken] = useState(tokenData);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userState, setUser] = React.useState<TCtxUser>({
    userId: 0,
    email: '',
    username: '',
    profileImage: 'images/no_profile_picture.png'
  });

  const getUser = async () => {
    try {
      const response = await fetch(GV.URLS.API_POST + GV.URLS.IS_LOGGED_IN, {
        method: 'GET',
        credentials: 'include'
      });

      const responseJSON = await response.json();

      if (responseJSON.ok) {
        setUser(responseJSON.body);
        setIsLoggedIn(true);
      }
    } catch (error: any) {
      console.log(error.message);
    }
  };

  const logoutHandler = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('expirationTime');
      localStorage.removeItem('userId');
      localStorage.removeItem('email');
      localStorage.removeItem('username');
      localStorage.removeItem('profileImage');

      setToken(null);
      setUser({
        userId: 0,
        email: '',
        username: '',
        profileImage: 'images/no_profile_picture.png'
      });
      setIsLoggedIn(false);

      if (logoutTimer) {
        clearTimeout(logoutTimer);
      }
    }
  }, []);

  const loginHandler = (updateToken: string, expirationTime: string, user: TCtxUser) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', updateToken);
      localStorage.setItem('expirationTime', expirationTime);
      localStorage.setItem('userId', user.userId.toString());
      localStorage.setItem('email', user.email);
      localStorage.setItem('username', user.username);
      localStorage.setItem('profileImage', user.profileImage);

      setToken({ token: updateToken, duration: +expirationTime });
      setUser(user);
      setIsLoggedIn(true);

      const remainingTime = calculateRemainingTime(expirationTime);
      logoutTimer = setTimeout(logoutHandler, remainingTime);

      router.push('/');
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if (tokenData) {
      logoutTimer = setTimeout(logoutHandler, tokenData.duration);
    }
  }, [tokenData, logoutHandler]);

  const state: TAuthContext = {
    token: token,
    user: userState,
    isLoggedIn: isLoggedIn,
    login: loginHandler,
    logout: logoutHandler
  };

  return <AuthContext.Provider value={state}>{props.children}</AuthContext.Provider>;
};

export default AuthContextProvider;

export const useAuthContext = () => useContext(AuthContext);
