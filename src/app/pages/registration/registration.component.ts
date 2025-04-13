import { Component } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { M } from '@angular/cdk/keycodes';
import { User } from '../../user';

@Component({
  selector: 'app-registration',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    MatProgressSpinnerModule,
    RouterLink
  ],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss'
})
export class RegistrationComponent {
  signUpForm = new FormGroup({
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required, Validators.minLength(8)]),
    rePassword: new FormControl('',[Validators.required]),
    name: new FormGroup({
      firstname: new FormControl('', [Validators.required, Validators.minLength(2)]),
      lastname: new FormControl('', [Validators.required, Validators.minLength(2)])
    })
  });

  isLoading = false;
  showForm = true;
  singupError = '';

  constructor(private router: Router,private snackBar: MatSnackBar) {}
  
  signup(): void {
    if (this.signUpForm.invalid){
      this.singupError = "Please correct the form errors before submitting.";
      return;
    }
    const password = this.signUpForm.get('password');
    const rePassword = this.signUpForm.get('rePassword');
  
    if (password?.value != rePassword?.value){
      return;
    }
  
    this.isLoading = true;
    this.showForm = false;
    
    const newUser: User = {
      name: {
        firstname: this.signUpForm.value.name?.firstname || '',
        lastname: this.signUpForm.value.name?.lastname || '',
      },
      email: this.signUpForm.value.email || '',
      password: this.signUpForm.value.password || '',
      tasks: [],
      completed_taks: []
    };
    
    this.snackBar.open('Sikeres regisztráció!', 'OK', { duration: 3000 });

    console.log('New user:', newUser);
    console.log('Form value: ', this.signUpForm.value);

    setTimeout(() => {
      this.router.navigateByUrl('/home');
    }, 2000);
  }

 
}
