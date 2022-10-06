export type TComment = {
  id: number;
  memeId: number;
  message: string;
  creator: string;
  createdAt: string;
  User: { username: string; profileImage: string };
};
