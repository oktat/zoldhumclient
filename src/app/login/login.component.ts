import { Component } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { AuthapiService } from '../shared/authapi.service';
import { AppComponent } from '../app.component';
import { Router } from '@angular/router';

import * as bootstrap from 'bootstrap';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  userForm!: FormGroup

  constructor(
    private builder: FormBuilder,
    private authapi: AuthapiService,
    private app: AppComponent,
    private router: Router
  ) {}

  ngOnInit() {
    this.userForm = this.builder.group({
      name: new FormControl(''),
      password: new FormControl('')
    })
  }

  login() {
    this.authapi.login(this.userForm.value).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token)
        this.app.loggedIn = true
        this.router.navigate(['employee'])
      },
      error: (err) => {
        console.log('Hiba! A bejelentkezés sikertelen!')
        const modal = new bootstrap.Modal(
          document.getElementById('failLoginModal')!
        )
        modal.show()
      }
    })
  }

}
