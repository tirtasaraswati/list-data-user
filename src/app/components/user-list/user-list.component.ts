import { Component, inject, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../services/user.service';
import {
  Observable,
  catchError,
  of,
  tap,
  map,
  switchMap,
  startWith,
} from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
  private userService = inject(UserService);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  isMobile = window.innerWidth <= 768;

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.isMobile = window.innerWidth <= 768;
  }

  /* Using - State management */
  users$: Observable<User[]> = this.userService.users$;
  loading$: Observable<boolean> = this.userService.loading$;
  error$: Observable<string> = this.userService.error$;

  ngOnInit() {
    if (this.userService.checkUsersData.length === 0) {
      this.userService.getListUser();
    }
  }

  /* Not Using - State management */
  // errorMessage = '';
  // loading = true;

  // users$ = this.userService.getListUser().pipe(
  //   tap(() => (this.loading = false)),
  //   catchError((error) => {
  //     this.loading = false;
  //     this.errorMessage = error.message || 'Failed to load users!';
  //     return of([]);
  //   })
  // );

  searchQueryParam$ = this.route.queryParamMap.pipe(
    map((params) => params.get('search') || '')
  );

  filteredUsers$ = this.searchQueryParam$.pipe(
    switchMap((search) =>
      this.users$.pipe(
        map((users) =>
          users.filter((user) =>
            user.name.toLowerCase().includes(search.toLowerCase())
          )
        )
      )
    ),
    startWith([])
  );

  searchDataUsers(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    const searchValue = inputElement.value;
    this.router.navigate([], {
      queryParams: { search: searchValue },
      queryParamsHandling: 'merge',
    });
  }

  detailDataUser(userId: number) {
    this.router.navigate(['/user-details', userId]);
  }
}
