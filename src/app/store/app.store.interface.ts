import { UserInterface } from "../shared/interfaces/user.interface";

export interface AppState {
  user: UserInterface | null;
  isExit: boolean;
}

export const DEFAULT_STATE: AppState = {
  user: {
    id: '',
    accessToken: '',
    email: '',
    role: ''
  },
  isExit: false,
};

