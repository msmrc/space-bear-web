import { UserInterface } from "../shared/interfaces/user.interface";

export interface AppState {
  user: UserInterface | null;
  pageTitle: string;
  isExit: boolean;
}

export const DEFAULT_STATE: AppState = {
  pageTitle: '',
  user: {
    id: '',
    accessToken: '',
    email: '',
    role: ''
  },
  isExit: false,
};

