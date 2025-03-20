import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent {
  users$!: Observable<User[]>;
  errorMessage = '';
  loading = true;

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.users$ = this.userService.getListUsers().pipe(
      tap(() => (this.loading = false)),
      catchError((error) => {
        this.loading = false;
        this.errorMessage =
          error.message || 'Failed to get data User. Please try again later!';
        return of([]);
      })
    );
  }
}
