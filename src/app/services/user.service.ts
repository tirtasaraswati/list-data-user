import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUser = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getListUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUser).pipe(
      catchError((error) => {
        console.error('Error fetch data users:', error);
        return throwError(
          () => new Error('Failed to get data User. Please try again later!')
        );
      })
    );
  }
}
