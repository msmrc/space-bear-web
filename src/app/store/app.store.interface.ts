import { UserInterface } from "../shared/interfaces/user.interface";

export interface AppState {
  user: UserInterface | null;
  pageTitle: string;
  pageAction: {
    actionName: string;
    actionCallback: any;
  },
  pageSubtitle: string;
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
  pageSubtitle: '',
  pageAction: {
    actionCallback: null,
    actionName: '',
  },
  isExit: false,
};

