import { Injectable } from "@angular/core";
import { ComponentStore } from "@ngrx/component-store";
import { Observable } from "rxjs";
import { AppState, DEFAULT_STATE } from "./app.store.interface";
import { UserInterface } from "../shared/interfaces/user.interface";

@Injectable()
export class AppStore extends ComponentStore<AppState> {

  constructor() {
    super(DEFAULT_STATE);
  }

  readonly user$: Observable<UserInterface | null> = this.select(state => state.user);
  readonly isExit$: Observable<boolean> = this.select(state => state.isExit);

  readonly setUser = this.updater((state, user: UserInterface | null) => ({
    ...state,
    user
  }));

  readonly setLanguage = this.updater((state, language: string) => ({
    ...state,
    language
  }));

  readonly setIsExit = this.updater((state, isExit: boolean) => ({
    ...state,
    isExit
  }));
}
