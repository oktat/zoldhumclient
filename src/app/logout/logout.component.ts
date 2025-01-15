import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.css'
})
export class LogoutComponent {

  constructor(
    private app: AppComponent,
    private router: Router
  ) { }

  ngOnInit(): void {

    this.router.navigate(['home'])
  }

  ngOnDestroy(): void {
    this.app.loggedIn = false
    localStorage.removeItem('token')    
  }
}
