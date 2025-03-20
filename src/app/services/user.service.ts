import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError, of, BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { DEFAULT_USER } from '../models/default-user';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUser = 'https://jsonplaceholder.typicode.com/users';

  /* Using - State management */
  private usersSubject = new BehaviorSubject<User[]>([]);
  private loadingSubject = new BehaviorSubject<boolean>(false);
  private errorSubject = new BehaviorSubject<string>('');

  users$ = this.usersSubject.asObservable();
  loading$ = this.loadingSubject.asObservable();
  error$ = this.errorSubject.asObservable();

  get checkUsersData(): User[] {
    return this.usersSubject.getValue();
  }

  constructor(private http: HttpClient) {}

  getListUser(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next('');

    this.http
      .get<User[]>(this.apiUser)
      .pipe(
        catchError((error) => {
          this.loadingSubject.next(false);
          const errorMsg =
            error.message || 'Failed to get data User. Please try again later!';
          this.errorSubject.next(errorMsg);
          return throwError(() => new Error(errorMsg));
        })
      )
      .subscribe((users) => {
        this.loadingSubject.next(false);
        this.usersSubject.next(users);
      });
  }

  /* Not Using - State management */
  // getListUser(): Observable<User[]> {
  //   return this.http.get<User[]>(this.apiUser).pipe(
  //     catchError((error) => {
  //       console.error('Error fetch users data:', error);
  //       return throwError(
  //         () => new Error('Failed to get data User. Please try again later!')
  //       );
  //     })
  //   );
  // }

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
