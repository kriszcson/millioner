import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../users/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    private readonly userService: UsersService,
    private readonly router: Router
  ) { }

  ngOnInit(): void {
  }

  reload() {
    location.reload();
  }

  signOut() {
    this.userService.logOut();
    this.router.navigate(['/login']);
  }
}
