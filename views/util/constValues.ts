type TGlobalVariables = {
  URLS: {
    APP: string;
    API: string;
    API_POST: string;
    SIGNUP: string;
    LOGIN: string;
    LOGOUT: string;
    IS_LOGGED_IN: string;
  };
};

const GV: TGlobalVariables = {
  URLS: {
    APP: 'http://localhost:3000',
    API: '/api',
    API_POST: 'http://localhost:3000/api',
    SIGNUP: '/signup',
    LOGIN: '/login',
    LOGOUT: '/logout',
    IS_LOGGED_IN: '/is-logged-in'
  }
};

export default GV;

export enum EmojiName {
  Star = 'star',
  Love = 'love',
  Haha = 'haha',
  Wow = 'wow',
  Sad = 'sad',
  Angry = 'angry'
}

export enum EmojiNumber {
  Star = 1,
  Love = 2,
  Haha = 3,
  Wow = 4,
  Sad = 5,
  Angry = 6
}

export const Emojis = [
  { name: EmojiName.Star, number: EmojiNumber.Star },
  { name: EmojiName.Love, number: EmojiNumber.Love },
  { name: EmojiName.Haha, number: EmojiNumber.Haha },
  { name: EmojiName.Wow, number: EmojiNumber.Wow },
  { name: EmojiName.Sad, number: EmojiNumber.Sad },
  { name: EmojiName.Angry, number: EmojiNumber.Angry }
];
