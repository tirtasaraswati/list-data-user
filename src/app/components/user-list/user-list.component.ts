import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import { Observable, catchError, of, tap } from 'rxjs';
import { User } from '../../models/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  private userService = inject(UserService);
  private router = inject(Router);

  users$!: Observable<User[]>;
  errorMessage = '';
  loading = true;

  constructor() {}

  ngOnInit() {
    this.users$ = this.userService.getListUser().pipe(
      tap(() => (this.loading = false)),
      catchError((error) => {
        this.loading = false;
        this.errorMessage =
          error.message || 'Failed to get data User. Please try again later!';
        return of([]);
      })
    );
  }

  detailDataUser(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
}
