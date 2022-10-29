export interface UserInterface {
  id: string;
  email: string;
  accessToken: string;
  role: string;
}

export interface UserFromAPIInterface {
  access_token: string;
  createdAt: string;
  email: string;
  isEmailVerified: false
  isRemoved: boolean;
  role: string;
  updatedAt: string;
  __v: number;
  _id: string;
}
