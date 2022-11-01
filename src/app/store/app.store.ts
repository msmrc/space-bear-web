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
  readonly pageTitle$: Observable<string> = this.select(state => state.pageTitle);
  readonly pageAction$: Observable<any> = this.select(state => state.pageAction);
  readonly pageSubtitle$: Observable<string> = this.select(state => state.pageSubtitle);

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

  readonly setPageTitle = this.updater((state, pageTitle: string) => ({
    ...state,
    pageTitle
  }));

  readonly setPageAction = this.updater((state, pageAction: any) => ({
    ...state,
    pageAction
  }));

  readonly setPageSubtitle = this.updater((state, pageSubtitle: string) => ({
    ...state,
    pageSubtitle
  }));
}
