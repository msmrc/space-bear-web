import { UserProfileInterface } from "./user-profile.interface";

export interface UserInterface {
  id: string;
  email: string;
  accessToken: string;
  role: string;
  fullUser?: UserProfileInterface
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
