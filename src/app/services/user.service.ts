import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of } from 'rxjs';
import { User } from '../models/user.model';
import { DEFAULT_USER } from '../models/default-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUser = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getListUser(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUser).pipe(
      catchError((error) => {
        console.error('Error fetch users data:', error);
        return throwError(
          () => new Error('Failed to get data User. Please try again later!')
        );
      })
    );
  }

  getDetailUser(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUser}/${userId}`).pipe(
      catchError((error) => {
        console.error('Error fetch user details data:', error);
        // return of(DEFAULT_USER); // if want to show ui with default user data
        return throwError(
          () =>
            new Error('Failed to fetch user details. Please try again later.')
        );
      })
    );
  }
}
