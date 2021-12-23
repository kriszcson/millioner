import { state } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from './users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  loginForm: FormGroup;
  errorMessage = "Kötelező mező!";
  message = "";
  isSucces: boolean;
  isShow = false;
  token: string;

  ngOnInit(): void {/*
    if (localStorage.getItem('access_token')) {
      this.token = localStorage.getItem('access_token');
      if (!this.usersService.tokenExpired(this.token)) {
        this.router.navigateByUrl('');
      }
    } */
    this.loginForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
  }

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private usersService: UsersService) { }

  login() {
    const { email, password } = this.loginForm.value;
    this.usersService.login(email, password).subscribe(data => {
      this.message = "Sikeres Bejelentkezés!";
      setTimeout(() => {
        this.router.navigateByUrl('')
      }, 2000)
    }, error => {
      this.message = "Hibás felhasználónév vagy jelszó!";
    });
  }

  async signup() {
    const { email, password } = this.loginForm.value;
    this.usersService.signup(email, password).subscribe(data => {
      if (data.access_token) {
        this.login();
      }
      else {
        this.message = "Az email cím már regisztrálva van.";
      }
    })
  }

}

