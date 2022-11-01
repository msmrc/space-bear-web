import { Observable } from 'rxjs';
import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserProfileInterface } from '../interfaces/user-profile.interface';

@Injectable({ providedIn: 'root' })
export class UserService {
  constructor(private httpClient: HttpClient) { }

  getAllUsers(): Observable<UserProfileInterface[]> {
    return this.httpClient.get<UserProfileInterface[]>(`${environment.apiUrl}users/get-all-users`)
  }

  getUserById(id: string): Observable<UserProfileInterface> {
    return this.httpClient.get<UserProfileInterface>(`${environment.apiUrl}users/get-user-by-id/${id}`)
  }

  createProfile(user: UserProfileInterface): Observable<UserProfileInterface> {
    return this.httpClient.post<UserProfileInterface>(`${environment.apiUrl}users/create`, user);
  }
}
