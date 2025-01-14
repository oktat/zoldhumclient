import { Component } from '@angular/core';
import { 
  ReactiveFormsModule, 
  FormGroup,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { AuthapiService } from '../shared/authapi.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  userForm!: any;

  constructor(
    private authapi: AuthapiService,
    private builder: FormBuilder
  ) {}

  ngOnInit() {
    this.userForm = this.builder.group({
      name: [''],
      email: [''],
      password: [''],
      password_confirmation: ['']
    })
  }

  register() {
    console.log(this.userForm.value)
    this.authapi.register(this.userForm.value).subscribe({
      next: (res) => {
        console.log(res)
      }
    })
  }
}
