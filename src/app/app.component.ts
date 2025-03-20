import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  imports: [RouterModule],
  template: `
    <router-outlet></router-outlet>
    <p style="text-align: center;">{{ footer }}</p>
  `,
})
export class AppComponent {
  footer = 'angular-project';
}
