
import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UsersService } from './users.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private router: Router,
    private userService: UsersService
  ) { }

  canActivate() {
    if (!this.userService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return false;
    } else {
      return true;
    }
  }

}
