import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss'
})
export class UserListComponent {
  users = [
    { name: 'Tirta', email: 'alice@example.com', website: 'tirta.com' },
    { name: 'Lisa', email: 'bob@example.com', website: 'lisa.com' }
  ];
}
