export type ILoginUser = {
  userId: string;
  password: string;
  role: string;
};

export type IUserLoginResponse = {
  accessToken: string;
};
