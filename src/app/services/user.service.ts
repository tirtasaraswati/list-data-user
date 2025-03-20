import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})

export class UserService {
  private apiUser = 'https://jsonplaceholder.typicode.com/users';

  constructor(private http: HttpClient) {}

  getListUsers(): Observable<User[]> {
    return this.http.get<User[]>(this.apiUser);
  }
}
