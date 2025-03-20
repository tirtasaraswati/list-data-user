import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, catchError, of, switchMap } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-details',
  imports: [CommonModule],
  templateUrl: './user-details.component.html',
  styleUrl: './user-details.component.scss',
})
export class UserDetailsComponent {
  private route = inject(ActivatedRoute);
  private userService = inject(UserService);
  private router = inject(Router);

  user$!: Observable<User>;
  errorMessage = '';
  loading = true;

  constructor() {
    this.user$ = this.route.paramMap.pipe(
      switchMap((params) => {
        const userId = Number(params.get('id'));
        return this.userService.getDetailUser(userId);
      })
    );
  }

  goBack() {
    this.router.navigate(['']);
  }
}
